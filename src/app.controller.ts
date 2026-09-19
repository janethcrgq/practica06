import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service.js';

  interface Clase{
    id: number,
    nombre: string
  }

   
  const clases: Clase[]= [{
  id: 1,
  nombre: "yoga"
 }, {
  id: 2,
  nombre: "pilates"
 }]

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('clases')
  getClases(): {id: number; nombre: string}[]{
    return clases;

  }

  @Post('clases')

  //nest.js convierte el json a object si si trae la forma corrrecta
  agregarClase(@Body() cuerpo: {nombre: string}): Clase{
    const nueva: Clase= {
      id: clases.length+1,
      nombre: cuerpo.nombre
    }
    clases.push(nueva);
    return nueva;
}
}
