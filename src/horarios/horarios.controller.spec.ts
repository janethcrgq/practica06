import { Test, TestingModule } from '@nestjs/testing';
import { HorariosController } from './horarios.controller.js';
import { HorariosService } from './horarios.service.js';

describe('HorariosController', () => {
  let controller: HorariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorariosController],
      providers: [HorariosService],
    }).compile();

    controller = module.get<HorariosController>(HorariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
