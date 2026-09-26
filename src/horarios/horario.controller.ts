import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import type { CrearHorarioDto } from './dto/crear-horario.dto.js';
import type { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';
import { HorariosService } from './horario.service.js';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Get()
  async listar() {
    return this.horariosService.listar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const horario = await this.horariosService.buscar(Number(id));
    if (!horario) {
      throw new NotFoundException('No existe el horario');
    }
    return horario;
  }

  @Post()
  @HttpCode(201)
  async crear(@Body() dto: CrearHorarioDto) {
    return this.horariosService.crear(dto);
  }

  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarHorarioDto) {
    const actualizado = await this.horariosService.actualizar(Number(id), dto);
    if (!actualizado) {
      throw new NotFoundException('No existe el horario');
    }
    return actualizado;
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const eliminado = await this.horariosService.eliminar(Number(id));
    if (!eliminado) {
      throw new NotFoundException('No existe el horario');
    }
    return eliminado;
  }
}