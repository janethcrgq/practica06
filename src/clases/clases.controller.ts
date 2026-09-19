import { Body, Get, Post, Controller } from '@nestjs/common';
import type {Clase} from './clases.service.js';
import { ClasesService } from './clases.service.js';

@Controller('clases')
export class ClasesController {

  constructor(
    private readonly clasesService: ClasesService
  ){}

@Get()
  listar(): Clase[]{
    return this.clasesService.listar();
  }

  

  @Post()

  //nest.js convierte el json a object si si trae la forma corrrecta
  agregarClase(@Body() cuerpo: {nombre: string}): Clase{
    return this.clasesService.crear(cuerpo.nombre);

  }
}