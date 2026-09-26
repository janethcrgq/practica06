import { Module } from '@nestjs/common';
import { ClasesController } from './clases.controller.js';
import { ClasesService } from './clases.service.js';
import { CLASE_REPOSITORY } from './clases.tokens.js';
import { ClaseMemoriaRepository } from './infra/clase-memoria.repository.js';



@Module({
  controllers: [ClasesController],
  providers: [ClasesService, {
    provide: CLASE_REPOSITORY,
    useClass: ClaseMemoriaRepository
  }]
  
})
export class ClasesModule {}
