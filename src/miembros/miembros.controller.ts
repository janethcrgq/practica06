import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { MiembrosService } from './miembros.service.js';
import type { crearMiembroDTO } from './dto/crear-miembro.dto.js';
import type { actualizarMiembroDTO } from './dto/actualizar-miembro.dto.js';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {
}

@Get()
async listar(){
  return this.miembrosService.listar();
}

@Get(':id')
async buscar(@Param('id') id:string){
  const miembro= await this.miembrosService.buscar(Number(id));
   if (!miembro) {
      throw new NotFoundException('No existe el miembro');
    }
    return miembro;
}

@Post()
  @HttpCode(201)
  async crear(@Body() dto: crearMiembroDTO) {
    return this.miembrosService.crear(dto);
  }

  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto: actualizarMiembroDTO) {
    const actualizado = await this.miembrosService.actualizar(Number(id), dto);
    if (!actualizado) {
      throw new NotFoundException('No existe el miembro');
    }
    return actualizado;
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const eliminado = await this.miembrosService.eliminar(Number(id));
    if (!eliminado) {
      throw new NotFoundException('No existe el miembro');
    }
    return eliminado;
  }
}