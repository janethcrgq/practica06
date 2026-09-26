import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ClasesModule } from './clases/clases.module.js';
import { InscripcionesModule } from './inscripciones/inscripciones.module.js';
import { MiembrosModule } from './miembros/miembros.module.js';
import { HorariosModule } from './horarios/horarios.module.js';

@Module({
  imports: [ClasesModule, InscripcionesModule, MiembrosModule, HorariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
