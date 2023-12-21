import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccoungBodySchema = z.infer<typeof createAccountBodySchema>
@ApiTags('auth')
@Controller('/api/v1/auth/signup')
export class CreateAccounController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @ApiOperation({
    summary: 'Criar conta',
    description: 'Endpoint para criar conta.',
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
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Nome do usuário',
    type: String,
  })
  async handle(@Body() body: CreateAccoungBodySchema) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('E-mail já cadastrado.')
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
