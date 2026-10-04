import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { ErrorDominioFilter } from './comun/filtros/errores-dominio.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://localhost:5173', "https://mipaginaweb.com"],
    exposedHeaders: ['Location', "X-Request-Id"]
  })
  app.useGlobalPipes(
    new ValidationPipe({
     whitelist: true,
     forbidNonWhitelisted: true,
     transform: true,
     transformOptions: {enableImplicitConversion: true}
  })
  )
  app.useGlobalFilters(new ErrorDominioFilter);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
