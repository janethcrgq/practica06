import { Module } from '@nestjs/common';
import { InscripcionesController } from './inscripciones.controller.js';
import { InscripcionesService } from './inscripciones.service.js';
import { InscripcionMemoriaRepository } from './infra/inscripcion-memoria.repository.js';


@Module({
  controllers: [InscripcionesController],
  providers: [InscripcionesService, {
    provide: "INSCRIPCION_REPOSITORY",
    //cuando tengamos este token use la clase InscripcionMemoriaRepository,
    // si queremos cambiar a una bd, solo cambiamos aqui la clase 

    useClass: InscripcionMemoriaRepository
  }]
})
export class InscripcionesModule {}
