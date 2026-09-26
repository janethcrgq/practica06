import { Controller, Get, NotFoundException, Param, Post, Delete, Body, Res, HttpCode, ConflictException, BadRequestException } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service.js';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto.js';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto.js';
import type { Response } from 'express';
import { CupoLlenoError, HorarioNoEncontradoError, InscripcionDuplicadaError, MiembroNoEncontradoError } from './dominio/errores.js';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(
    private readonly servicio: InscripcionesService
  ){}

  @Get()
  async listar(){
    const lista= await this.servicio.listar();
    return lista.map(aInscripcionDto); 
  }

  @Get(':id')
  async buscar(@Param(`id`) id: string){
    const inscripcion= await this.servicio.buscar(Number(id));
    if(!inscripcion){
      throw new NotFoundException("No existe la inscripcion");
    }
    return aInscripcionDto(inscripcion);
  }

  @Post()
  @HttpCode(201)
  //implementar async crear
  async crear(
    @Body() dto: CrearInscripcionDto,
    @Res( { passthrough: true }) res: Response,
  ){

    if(!Number.isInteger(dto?.horarioId) || !Number.isInteger(dto?.miembroId)){
      throw new BadRequestException('horarioId y miembroId son obligatorios y deben ser numeros enteros');
    }


    try{
    const inscripcion= await this.servicio.crear(dto);
    //agrega la cabecera Location, apuntando a la URL específica de la inscripción recién creada (usando su id real)
    res.setHeader('Location', `/inscripciones/${inscripcion.id}`);
    return aInscripcionDto(inscripcion);
    } catch(error){
      if(error instanceof HorarioNoEncontradoError || error instanceof MiembroNoEncontradoError){
        throw new NotFoundException(error.message);

      }

      if(error instanceof CupoLlenoError || error instanceof InscripcionDuplicadaError){
        throw new ConflictException(error.message);
      }
      throw error;


      }
    }
  
    
  @Delete(':id')
  //implementar cancelar 
  async borrar(@Param('id') id: string){
    const cancelada= await this.servicio.cancelar(Number(id));
    if(!cancelada){
      throw new NotFoundException(`No existe la inscripcion ${id}`);
    }
    return aInscripcionDto(cancelada);
    


  }

  }



