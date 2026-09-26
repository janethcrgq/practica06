import { Test, TestingModule } from '@nestjs/testing';
import { MiembrosService } from './miembros.service.js';

describe('MiembrosService', () => {
  let service: MiembrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiembrosService],
    }).compile();

    service = module.get<MiembrosService>(MiembrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
