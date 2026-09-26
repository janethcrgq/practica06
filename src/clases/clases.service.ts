import { Inject, Injectable } from '@nestjs/common';
import { Clase } from './dominio/entidades.js';
import { CLASE_REPOSITORY } from './clases.tokens.js';
import type { ClaseRepository } from './dominio/clase.repository.js';
import { crearClaseDTO } from './dto/crear-clase.dto.js';
import { actualizarClaseDTO } from './dto/editar-clase.dto.js';


 
@Injectable()
export class ClasesService {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly repo: ClaseRepository
  ){}



listar(): Promise<Clase[]>{
  return this.repo.listar();
}

buscar(id: number): Promise<Clase | null>{
  return this.repo.buscarPorId(id)
}

crear(dto: crearClaseDTO): Promise<Clase | null>{
  return this.repo.crear(dto);
}

actualizar(id: number, dto: actualizarClaseDTO): Promise<Clase | null>{
  return this.repo.actualizar(id, dto);
}

eliminar(id: number): Promise<Clase | null>{
  return this.repo.eliminar(id);

}

}




