import { Injectable } from "@nestjs/common";
import { ClaseRepository } from "../dominio/clase.repository.js";
import { Clase } from "../dominio/entidades.js";
import { crearClaseDTO } from "../dto/crear-clase.dto.js";
import { actualizarClaseDTO } from "../dto/editar-clase.dto.js";

@Injectable()
export class ClaseMemoriaRepository implements ClaseRepository{
  private clases: Clase[]= [{
    id: 1,
    nombre: "yoga"
   }, {
    id: 2,
    nombre: "pilates"
   }]

   private siguienteId= 3;

   async listar(): Promise<Clase[]>{
    return this.clases;
   }

  async buscarPorId(id: number): Promise<Clase | null>{
    return this.clases.find((c) => c.id === id) ?? null;
   }

   async crear(datos: crearClaseDTO): Promise<Clase>{
    const nueva: Clase={
      id: this.siguienteId++,
      nombre: datos.nombre
    }
    this.clases.push(nueva);
    return nueva; 
   }

   async actualizar(id: number, datos: actualizarClaseDTO): Promise<Clase | null>{
    const clase= this.clases.find((c) => c.id === id);
    if(!clase){
      return null;
    }
    if(datos.nombre !== undefined){ clase.nombre = datos.nombre}
    return clase;
   }

   async eliminar(id: number): Promise<Clase | null>{
    const indice= this.clases.findIndex(c => c.id ===id)
    if(indice === -1){
      return null;
    }
    const [eliminado]= this.clases.splice(indice, 1);
    return eliminado;
   }







} 