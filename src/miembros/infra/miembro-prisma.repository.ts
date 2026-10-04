import { Injectable } from "@nestjs/common";
import { MIEMBRO_REPOSITORY } from "../miembros.tokens";
import { MiembroRepository } from "../dominio/miembro.repository";
import { Miembro } from "../dominio/entidades";
import { ActualizarMiembroDto } from "../dto/actualizar-miembro.dto";
import { CrearMiembroDto } from "../dto/crear-miembro.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MiembroPrismaRepository implements MiembroRepository{
  constructor(private readonly prisma: PrismaService){}

  async listar(): Promise<Miembro[]> {
    return this.prisma.miembro.findMany()
  }
  async buscarPorId(id: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({where: {id}});
  }
  async crear(datos: CrearMiembroDto): Promise<Miembro> {
    return this.prisma.miembro.create({data: datos});
  }
  async actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null> {
    const existe= await this.prisma.miembro.findUnique({where: {id}});
    if(!existe){
      return null;
    }
    return this.prisma.miembro.update({where: {id}, data: datos});
  }
  async eliminar(id: number): Promise<Miembro | null> {
    const existe= await this.prisma.miembro.findUnique({where: {id}});
    if(!existe){
      return null;
    }
    return this.prisma.miembro.delete({where: {id}});
  }
  

}