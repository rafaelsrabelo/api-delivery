import { Controller, Post, UseGuards, Body } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createOrderBodySchema = z.object({
  customer: z.string(),
  address: z.string(),
  status: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema)
type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>
@ApiTags('orders')
@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar pedido',
    description: 'Endpoint para criar pedido.',
  })
  @ApiQuery({
    name: 'custommer',
    required: true,
    description: 'Nome do cliente',
    type: String,
  })
  @ApiQuery({
    name: 'address',
    required: true,
    description: 'Endereço de entrega',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Status do pedido (opened, done, canceled, progress)',
    type: String,
  })
  async handle(
    @Body(bodyValidationPipe) body: CreateOrderBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { customer, address, status } = body
    await this.prisma.order.create({
      data: {
        customer,
        address,
        status,
      },
    })
  }
}
