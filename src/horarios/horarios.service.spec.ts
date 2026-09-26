import { Test, TestingModule } from '@nestjs/testing';
import { HorariosService } from './horarios.service.js';

describe('HorariosService', () => {
  let service: HorariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorariosService],
    }).compile();

    service = module.get<HorariosService>(HorariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
