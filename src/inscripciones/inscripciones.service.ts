import { Injectable, Inject } from '@nestjs/common';
import type { InscripcionRepository } from './dominio/inscripcion.repository.js';
import { Inscripcion } from './dominio/entidades.js';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto.js';
import { CupoLlenoError, HorarioNoEncontradoError, InscripcionDuplicadaError, MiembroNoEncontradoError } from './dominio/errores.js';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens.js';


@Injectable()
export class InscripcionesService {
  
  constructor(
    @Inject(INSCRIPCION_REPOSITORY)
    private readonly repo: InscripcionRepository
  ){

  }

  listar(): Promise<Inscripcion[]>{
    return this.repo.listar();

  }

  buscar(id: number): Promise<Inscripcion | null>{
    return this.repo.buscarPorId(id);
  }

  async crear(dto: CrearInscripcionDto): Promise<Inscripcion>{
    const horario= await this.repo.buscarHorario(dto.horarioId);
    if(!horario){
      throw new HorarioNoEncontradoError(dto.horarioId)
    }

    const miembro= await this.repo.buscarMiembro(dto.miembroId);

    if(!miembro){
      throw new MiembroNoEncontradoError(dto.miembroId);
    }

    const delHorario= await this.repo.buscarPorHorario(dto.horarioId);

    const yaInscrito= await delHorario.some(
      (i) => i.miembroId === dto.miembroId && i.estado !== 'cancelada'
    );

        if(yaInscrito){
          throw new InscripcionDuplicadaError(dto.horarioId, dto.miembroId)
        }

        const confirmadas= delHorario.filter((i)=> i.estado === 'confirmada').length;
        if (confirmadas>= horario.cupoMaximo){
          throw new CupoLlenoError(horario.id, horario.cupoMaximo);
        }



        return this.repo.guardar({
          horarioId: dto.horarioId,
          miembroId: dto.miembroId
        });
      }

      cancelar(id: number): Promise<Inscripcion | null>{
        return this.repo.cancelar(id);
      }

    


  }

