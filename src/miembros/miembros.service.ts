import { Inject, Injectable } from '@nestjs/common';
import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';
import type { MiembroRepository } from './dominio/miembros.repository.js';
import { Miembro } from './dominio/entidades.js';
import { crearMiembroDTO } from './dto/crear-miembro.dto.js';
import { actualizarMiembroDTO } from './dto/actualizar-miembro.dto.js';

@Injectable()
export class MiembrosService {

  constructor(
    @Inject(MIEMBRO_REPOSITORY)
    private readonly repo: MiembroRepository,

  ){}

  listar(): Promise<Miembro[]>{
    return this.repo.listar();
  }
  
  buscar(id: number): Promise<Miembro | null>{
    return this.repo.buscarPorId(id);
  }

  crear(dto: crearMiembroDTO): Promise<Miembro>{
    return this.repo.crear({
      nombre: dto.nombre,
      correo: dto.correo,
      membresia: dto.membresia
    });

  }

   actualizar(id: number, dto: actualizarMiembroDTO): Promise<Miembro | null> {
    return this.repo.actualizar(id,{
      nombre: dto.nombre,
      correo: dto.correo,
      membresia: dto.membresia,
      activo: dto.activo,
    }

    );
  }

  eliminar(id: number): Promise<Miembro | null> {
    return this.repo.eliminar(id);
  }


}
