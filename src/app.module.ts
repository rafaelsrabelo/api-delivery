import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccounController } from './controllers/create-account.controller'

@Module({
  imports: [],
  controllers: [CreateAccounController],
  providers: [PrismaService],
})
export class AppModule {}
