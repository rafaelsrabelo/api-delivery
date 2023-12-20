import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'

@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user)
    return 'ok'
  }
}
