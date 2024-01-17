import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { SeedService } from './controllers/seed-controller'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })

  const config = new DocumentBuilder()
    .setTitle('Delliv API RESTful')
    .setDescription(
      'API para aplicativo de rastreamento de entregas que permita aos usuários autenticados visualizar uma lista de pedidos, atualizar o status de cada pedido e fornecer recursos de autenticação e segurança.',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build()

  config.servers = [
    { url: `http://localhost:${port}`, description: 'Localhost' },
  ]

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)
  app.enableCors()

  // const seedService = app.get(SeedService)
  // await seedService.seedOrders()
  await app.listen(port || 3000)
}

bootstrap()
