export interface Horario {
  id: number;
  claseId: number;
  dia: string;
  horaInicio: string;
  cupoMaximo: number;
  entrenador: string;
}

export type NuevoHorario = Omit<Horario, 'id'>;
export type CambiosHorario = Partial<Omit<Horario, 'id'>>;