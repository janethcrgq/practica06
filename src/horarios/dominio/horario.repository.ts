import { Horario, NuevoHorario, CambiosHorario } from './entidades.js';

export interface HorarioRepository {
  listar(): Promise<Horario[]>;
  buscarPorId(id: number): Promise<Horario | null>;
  crear(datos: NuevoHorario): Promise<Horario>;
  actualizar(id: number, cambios: CambiosHorario): Promise<Horario | null>;
  eliminar(id: number): Promise<Horario | null>;
}