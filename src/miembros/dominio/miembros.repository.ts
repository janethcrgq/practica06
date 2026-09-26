import { Miembro } from "./entidades.js";
import { NuevoMiembro } from "./entidades.js";
import { CambiosMiembro } from "./entidades.js";

export interface MiembroRepository{
   listar(): Promise<Miembro[]>;
   buscarPorId(id: number): Promise<Miembro | null>;
   crear(datos: NuevoMiembro): Promise<Miembro>;
   actualizar(id: number, cambios: CambiosMiembro): Promise<Miembro | null>;
   eliminar(id: number): Promise<Miembro | null>;


}