import { Controller, UseGuards, Body, Put, Param } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

const updateOrderBodySchema = z.object({
  status: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(updateOrderBodySchema)
type UpdateOrderBodySchema = z.infer<typeof updateOrderBodySchema>

@ApiTags('orders')
@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
export class UpdateOrderController {
  constructor(private prisma: PrismaService) {}

  @Put(':orderId')
  @ApiOperation({
    summary: 'Atualizar status e associar usuário à ordem',
    description: 'Endpoint para atualizar o status e associar usuário à ordem.',
  })
  async handle(
    @Param('orderId') orderId: string,
    @Body(bodyValidationPipe) body: UpdateOrderBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { status } = body
    const userId = user.sub

    if (!orderId || !isValidUUID(orderId)) {
      throw new Error('Invalid order ID')
    }

    const existingOrder = await this.prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!existingOrder) {
      throw new Error('Order not found')
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!existingUser) {
      throw new Error('User not found')
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        user: { connect: { id: userId } }, // Associar usuário à ordem
      },
    })

    return { order: updatedOrder }
  }
}
