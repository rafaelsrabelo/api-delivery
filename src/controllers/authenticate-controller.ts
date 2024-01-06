import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
    description: 'Objeto de autenticação',
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

    const expirationTimeInSeconds = 3600

    const accessToken = this.jwt.sign(
      { sub: user.id },
      { expiresIn: expirationTimeInSeconds },
    )

    return {
      acess_token: accessToken,
      name: user.name,
      email: user.email,
    }
  }
}
