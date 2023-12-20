import { Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'

@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  constructor() {
    console.log('a')
  }

  @Post()
  async handle() {
    return 'ok'
  }
}
