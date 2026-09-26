import { Controller } from '@nestjs/common';
import { HorariosService } from './horarios.service.js';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}
}
