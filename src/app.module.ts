import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { CreateAccounController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate-controller'
import { CreateOrderController } from './controllers/create-order.controller'
import { FetchRecentOrdersController } from './controllers/fetch-recent-orders.controller'
import { UpdateOrderController } from './controllers/update-order.controller'
import { SeedService } from './controllers/seed-controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccounController,
    UpdateOrderController,
    AuthenticateController,
    CreateOrderController,
    FetchRecentOrdersController,
    SeedService,
  ],
  providers: [PrismaService],
})
export class AppModule {}
