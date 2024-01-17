import { Controller, Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { PrismaService } from 'src/service/prisma.service'
import { z } from 'zod'

const createOrderBodySchema = z.object({
  customer: z.string(),
  address: z.string(),
  status: z.string(),
})

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Injectable()
@Controller('api/1v1/seed')
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  generateFakeOrder(): CreateOrderBodySchema {
    return {
      customer: faker.name.firstName(),
      address: faker.address.streetAddress(),
      status: 'opened',
    }
  }

  async seedOrders() {
    const numberOfOrders = 20

    try {
      const count = await this.prisma.order.count()

      if (count === 0) {
        const ordersData: CreateOrderBodySchema[] = Array.from(
          { length: numberOfOrders },
          () => this.generateFakeOrder(),
        )

        for (const order of ordersData) {
          await this.prisma.order.create({
            data: order,
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
