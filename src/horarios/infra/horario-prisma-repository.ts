import { Injectable } from "@nestjs/common";
import { ClaseRepository } from "src/clases/dominio/clase.repository";
import { Clase } from "src/clases/dominio/entidades";
import { ActualizarClaseDto } from "src/clases/dto/actualizar-clase.dto";
import { CrearClaseDto } from "src/clases/dto/crear-clase.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { HorarioRepository } from "../dominio/horario.repository";
import { Horario } from "../dominio/entidades";
import { ActualizarHorarioDto } from "../dto/actualizar-horario.dto";
import { CrearHorarioDto } from "../dto/crear-horario.dto";

@Injectable()
export class HorarioPrismaRepository implements HorarioRepository
{
  constructor(private readonly prisma: PrismaService){}

  async listar(): Promise<Horario[]> {
    return this.prisma.horario.findMany();
    
  }
  async buscarPorId(id: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({where: {id}})
  }
  async crear(datos: CrearHorarioDto): Promise<Horario> {
    return this.prisma.horario.create({data: datos});
  }
  async actualizar(id: number, datos: ActualizarHorarioDto): Promise<Horario | null> {
    const existe= await this.prisma.horario.findUnique({where: {id}});
    if(!existe){
      return null;
    }
    return this.prisma.horario.update({where: {id}, data: datos});
  }
  async eliminar(id: number): Promise<Horario | null> {
    const existe= await this.prisma.horario.findUnique({where: {id}});
    if(!existe){
      return null;
    }
    return this.prisma.horario.delete({where: {id}});
  }

  


}