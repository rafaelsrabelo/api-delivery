import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('/api/v1/auth')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  // HttpCode(200)
  // @usePipes()
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' })
    return token
  }
}
