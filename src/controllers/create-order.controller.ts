import { Controller, Post, UseGuards, Body } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/service/prisma.service'
import { z, ZodObject, ZodString } from 'zod'

const createOrderBodySchema: ZodObject<{
  customer: ZodString
  address: ZodString
  status: ZodString
}> = z.object({
  customer: z.string(),
  address: z.string(),
  status: z.string(),
})

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

class CreateOrderApiBodyModel {
  @ApiProperty({
    description: 'Endereço de entrega',
    type: String,
  })
  address?: string

  @ApiProperty({
    description: 'Nome do cliente',
    type: String,
  })
  customer?: string

  @ApiProperty({
    description: 'Status do pedido (opened, done, canceled, progress)',
    type: String,
  })
  status?: string
}

@ApiTags('orders')
@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CreateOrderController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar pedido',
    description: 'Endpoint para criar pedido.',
  })
  @ApiBody({ type: CreateOrderApiBodyModel })
  async handle(
    @Body(new ZodValidationPipe(createOrderBodySchema)) body: CreateOrderBodySchema,
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
