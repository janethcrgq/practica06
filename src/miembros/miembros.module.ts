import { Module } from '@nestjs/common';
import { MiembrosService } from './miembros.service.js';
import { MiembrosController } from './miembros.controller.js';
import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';
import { MiembroMemoriarepository } from './infra/miembro-memoria.repository.js';

@Module({
  controllers: [MiembrosController],
  providers: [MiembrosService,{
    provide: MIEMBRO_REPOSITORY,
    useClass: MiembroMemoriarepository
  }],
})
export class MiembrosModule {}
