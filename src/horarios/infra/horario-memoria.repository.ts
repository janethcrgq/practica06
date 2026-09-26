import { Injectable } from '@nestjs/common';
import { Horario, NuevoHorario, CambiosHorario } from '../dominio/entidades.js';
import { HorarioRepository } from '../dominio/horario.repository.js';

@Injectable()
export class HorarioMemoriaRepository implements HorarioRepository {
  private horarios: Horario[] = [
    { id: 1, claseId: 1, dia: 'lunes', horaInicio: '07:00', cupoMaximo: 2, entrenador: 'Ana Robles' },
    { id: 2, claseId: 1, dia: 'miercoles', horaInicio: '07:00', cupoMaximo: 3, entrenador: 'Ana Robles' },
    { id: 3, claseId: 2, dia: 'martes', horaInicio: '19:00', cupoMaximo: 4, entrenador: 'Luis Fierro' },
  ];
  private siguienteId = 4;

  async listar(): Promise<Horario[]> {
    return this.horarios;
  }

  async buscarPorId(id: number): Promise<Horario | null> {
    return this.horarios.find((h) => h.id === id) ?? null;
  }

  async crear(datos: NuevoHorario): Promise<Horario> {
    const nuevo: Horario = { id: this.siguienteId++, ...datos };
    this.horarios.push(nuevo);
    return nuevo;
  }

  async actualizar(id: number, cambios: CambiosHorario): Promise<Horario | null> {
    const horario = this.horarios.find((h) => h.id === id);
    if (!horario) return null;
    Object.assign(horario, cambios);
    return horario;
  }

  async eliminar(id: number): Promise<Horario | null> {
    const indice = this.horarios.findIndex((h) => h.id === id);
    if (indice === -1) return null;
    const [borrado] = this.horarios.splice(indice, 1);
    return borrado;
  }
}