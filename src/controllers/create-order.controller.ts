import { Controller, Post, UseGuards, Body } from '@nestjs/common'
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

@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateOrderBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { customer, address, status } = body
    const userId = user.sub
    await this.prisma.order.create({
      data: {
        customer,
        address,
        user_id: userId,
        status,
      },
    })
  }
}
