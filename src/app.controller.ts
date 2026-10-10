import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Publico } from './auth/decoradores/publico.decorators';

@Publico()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // Nest arma AppService y lo entrega ya listo aquí

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
