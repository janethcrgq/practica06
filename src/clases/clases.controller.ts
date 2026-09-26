import { Body, Get, Post, Controller, HttpCode, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import type { Clase } from './dominio/entidades.js';
import { ClasesService } from './clases.service.js';
import type { crearClaseDTO } from './dto/crear-clase.dto.js';
import type { actualizarClaseDTO } from './dto/editar-clase.dto.js';

@Controller('clases')
export class ClasesController {

  constructor(
    private readonly clasesService: ClasesService
  ){}

@Get()
  listar(){
    return this.clasesService.listar();
  }

  

  @Post()
  @HttpCode(201)
  crear(@Body() cuerpo: crearClaseDTO){
    return this.clasesService.crear(cuerpo);
  }

  @Patch(':id')
    async actualizar(@Param('id') id:string, @Body() dto: actualizarClaseDTO){
      const clase= await this.clasesService.actualizar(Number(id), dto);
      if(!clase){
        throw new NotFoundException('No exoste la clase para actualizar')
      }
      return clase;
    }
  

  @Delete(":id")
    async eliminar(@Param("id") id: string){
      const clase= await this.clasesService.eliminar(Number(id));
      if(!clase){
        throw new NotFoundException("No existe la clase");

      }
      return clase;
    }

  


  
  }
