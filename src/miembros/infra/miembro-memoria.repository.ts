import { Injectable } from "@nestjs/common";
import { Miembro, NuevoMiembro, CambiosMiembro } from "../dominio/entidades.js";
import { MiembroRepository } from "../dominio/miembros.repository.js";

@Injectable()
export class MiembroMemoriarepository implements MiembroRepository{

  private miembros: Miembro[] = [
    { id: 1, nombre: 'Karla Duarte', correo: 'karla@itson.mx', membresia: 'premium', activo: true },
    { id: 2, nombre: 'Omar Valdez', correo: 'omar@itson.mx', membresia: 'plus', activo: true },
    { id: 3, nombre: 'Sofia Ibarra', correo: 'sofia@itson.mx', membresia: 'basica', activo: true },
  ];
  private siguienteId= 4;

  async listar(): Promise<Miembro[]> {
    return this.miembros;
    
  }
  async buscarPorId(id: number): Promise<Miembro | null> {
    return this.miembros.find((m)=> m.id === id) ?? null;
  }
  async crear(datos: NuevoMiembro): Promise<Miembro> {
    const nuevoMiembro: Miembro = {
      id: this.siguienteId++,
      nombre: datos.nombre,
      correo: datos.correo,
      membresia: datos.membresia,
      activo: true
    }
    this.miembros.push(nuevoMiembro);
    return nuevoMiembro;
  }
  async actualizar(id: number, cambios: CambiosMiembro): Promise<Miembro | null> {
    const miembro= this.miembros.find((m)=> m.id === id);
    if(!miembro){
      return null
    }
    Object.assign(miembro, cambios);
    return miembro;

  }
  async eliminar(id: number): Promise<Miembro | null> {
    const indice= this.miembros.findIndex((m)=> m.id === id);
    if(indice === -1){
      return null;
    }
    const [borrado]= this.miembros.splice(indice, 1);
    return borrado;

  }

}