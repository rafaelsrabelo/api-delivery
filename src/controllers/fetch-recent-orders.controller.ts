import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/service/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
  .object({
    page: z
      .string()
      .optional()
      .default('1')
      .transform(Number)
      .refine((val) => val >= 1, {
        message: 'Page number must be greater than or equal to 1',
      }),
    status: z
      .string()
      .optional()
      .transform((val) => val && val.toLowerCase()),
  })
  .refine((val) => typeof val === 'object' && val !== null)

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const ITEMS_PER_PAGE = 10

@ApiTags('orders')
@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FetchRecentOrdersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({
    summary: 'Obter pedidos recentes',
    description: 'Endpoint para obter pedidos recentes.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    type: Number,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Status do pedido (opened, done, canceled, progress)',
    type: String,
  })
  async handle(@Query(queryValidationPipe) params: PageQueryParamSchema) {
    const { page, status } = params

    let where = {}

    if (status) {
      where = {
        status: {
          equals: status,
        },
      }
    }

    const totalCount = await this.prisma.order.count({ where })
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    const orders = await this.prisma.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      orderBy: {
        created_at: 'desc',
      },
      where,
      include: { user: true },
    })

    const mappedOrders = orders.map((order) => ({
      id: order.id,
      customer: order.customer,
      address: order.address,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
      user: order.user
        ? {
            id: order.user.id,
            name: order.user.name,
            email: order.user.email,
          }
        : null,
    }))

    return {
      data: mappedOrders,
      meta: {
        total: totalCount,
        page: +page,
        limit: ITEMS_PER_PAGE,
        totalPages,
      },
    }
  }
}
