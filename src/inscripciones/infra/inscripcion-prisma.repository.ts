import { Injectable } from "@nestjs/common";
import { InscripcionRepository } from "../dominio/inscripcion.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { Inscripcion, Horario, Miembro, NuevaInscripcion } from "../dominio/entidades";

@Injectable()
export class InscripcionPrismaRepository implements InscripcionRepository{

  constructor(private readonly prisma: PrismaService){}
  
  async listar(): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany();
  }
  async buscarPorId(id: number): Promise<Inscripcion | null> {
    return this.prisma.inscripcion.findUnique({where: {id}});
  }
  async buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany({where: {horarioId}});
  }
  async buscarHorario(horarioId: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({where: {id: horarioId}});
  }
  async buscarMiembro(miembroId: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({where: {id: miembroId}});
  }
  async guardar(datos: NuevaInscripcion): Promise<Inscripcion> {
    return this.prisma.inscripcion.create({data: datos});
  }
  async cancelar(id: number): Promise<Inscripcion | null> {
    const existe= await this.prisma.inscripcion.findUnique({where: {id}});
    if(!existe){
      return null;
    }
    return this.prisma.inscripcion.update({where: {id}, data: {estado: 'cancelada'}})
  }
  
}