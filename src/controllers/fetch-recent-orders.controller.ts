import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/api/v1/orders')
@UseGuards(JwtAuthGuard)
export class FetchRecentOrdersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const orders = await this.prisma.order.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })

    return { orders }
  }
}
