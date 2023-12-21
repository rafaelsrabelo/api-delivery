import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const ITEMS_PER_PAGE = 10

@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
export class FetchRecentOrdersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const orders = await this.prisma.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      orderBy: {
        created_at: 'desc',
      },
    })

    return { orders }
  }
}
