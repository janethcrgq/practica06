import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { DominioExceptionFilter } from './comun/filtros/errores-dominio.filter';
import { LoggingInterceptor } from './comun/interceptores/loggin.interceptor';
import { SobreInterceptor } from './comun/interceptores/sobre.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    //la peticion llega con un encabezado y valida los origines permitidos para hacer solicitudes HTTP
    //se puede hacer peticiones de 'https://localhost:5173' porque es donde corre Beat, ahi estaremos probando nuestras apps.

    //decimos que fronted nos puede hacer peticiones 
    origin: ['http://localhost:5173'],
    //encabezados que exponemos 
    exposedHeaders: ['Location', "X-Request-Id"]
  })

  //valida que tenga el formato correspondiente
  app.useGlobalPipes(
    new ValidationPipe({
     whitelist: true,
     forbidNonWhitelisted: true,
     transform: true,
     transformOptions: {enableImplicitConversion: true}
  })
  )

  //maneja los errores de dominio 
  app.useGlobalFilters(new DominioExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(), new SobreInterceptor());

  const reflector= app.get(Reflector) // el guard lo usa para leer @Publico()
app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector)); //todas las rutas piden token

  const config= new DocumentBuilder()
    .setTitle('API del Gimnasio')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
    const documento= SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documento);

  await app.listen(process.env.PORT ?? 3000);

  
}


bootstrap();
