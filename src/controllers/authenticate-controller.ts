import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { compare } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenicateBodySchema = z.infer<typeof authenticateBodySchema>
@ApiTags('auth')
@Controller('/api/v1/auth/signin')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  @ApiOperation({
    summary: 'Autenticação',
    description: 'Endpoint para autenticar e gerar token.',
  })
  @ApiQuery({
    name: 'password',
    required: true,
    description: 'Senha do usuário',
    type: String,
  })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'Email do usuário',
    type: String,
  })
  async handle(@Body() body: AuthenicateBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new UnauthorizedException('Usuário não credenciado!')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário não credenciado!')
    }

    const accessToken = this.jwt.sign({ sub: user.id })
    return {
      acess_token: accessToken,
    }
  }
}
