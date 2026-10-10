import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { InscripcionesService } from './inscripciones.service';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto';
import { UsuarioActual } from 'src/auth/decoradores/usuario-actual.decorator';
import { Rol, type PayLoadJwt } from 'src/auth/dominio/usuario';
import { Roles } from 'src/auth/decoradores/roles.decorator';


@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly servicio: InscripcionesService) {}

  @Get()
  async listar() {
    const lista = await this.servicio.listar();
    return lista.map(aInscripcionDto);
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const inscripcion = await this.servicio.buscar(Number(id));
    if (!inscripcion) {
      throw new NotFoundException(`No existe la inscripcion ${id}`);
    }
    return aInscripcionDto(inscripcion);
  }

  @Post()
  @HttpCode(201)
  async crear(
    @Body() dto: CrearInscripcionDto,
    @UsuarioActual() usuario: PayLoadJwt,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 400 = no entiendo la peticion. 409 = la entiendo, pero choca
    // con el estado actual del sistema.


    // los miembros solo pueden inscribirse a si mismos 
    if(usuario.rol === Rol.miembro && usuario.miembroId !== dto.miembroId){
      throw new ForbiddenException('Solo puedes incribirte a ti mismo');
    }
   

    
   const inscripcion = await this.servicio.crear(dto);// si falla, lanza y sale
   res.setHeader('Location', `/inscripciones/${inscripcion.id}`); //201 mas donde quedo
   return aInscripcionDto(inscripcion);
    
  }

  @Roles(Rol.entrenador, Rol.admin)
  @Delete(':id')
  async cancelar(@Param('id') id: string) {
    const cancelada = await this.servicio.cancelar(Number(id));
    if (!cancelada) {
      throw new NotFoundException(`No existe la inscripcion ${id}`);
    }
    return aInscripcionDto(cancelada);
  }
}
