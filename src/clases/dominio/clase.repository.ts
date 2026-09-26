import { Clase } from "./entidades.js";
import { crearClaseDTO } from "../dto/crear-clase.dto.js";
import { actualizarClaseDTO } from "../dto/editar-clase.dto.js";

export interface ClaseRepository{

  listar(): Promise<Clase[]>;
  buscarPorId(id: number): Promise<Clase | null>
  crear(datos: crearClaseDTO): Promise<Clase>
  actualizar(id: number, datos: actualizarClaseDTO): Promise<Clase | null>
  eliminar(id: number): Promise<Clase | null>






}