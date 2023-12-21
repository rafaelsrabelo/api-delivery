import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { CreateAccounController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate-controller'
import { CreateOrderController } from './controllers/create-order.controller'
import { FetchRecentOrdersController } from './controllers/fetch-recent-orders.controller'

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
    AuthenticateController,
    CreateOrderController,
    FetchRecentOrdersController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
