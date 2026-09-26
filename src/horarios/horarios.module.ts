import { Module } from '@nestjs/common';

import { HorarioMemoriaRepository } from './infra/horario-memoria.repository.js';
import { HORARIO_REPOSITORY } from './horarios.tokens.js';
import { HorariosService } from './horario.service.js';
import { HorariosController } from './horario.controller.js';

@Module({
  controllers: [HorariosController],
  providers: [
    HorariosService,
    {
      provide: HORARIO_REPOSITORY,
      useClass: HorarioMemoriaRepository,
    },
  ],
})
export class HorariosModule {}