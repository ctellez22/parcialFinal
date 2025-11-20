import { Test, TestingModule } from '@nestjs/testing';
import { AppintmentsController } from './appintments.controller';
import { AppintmentsService } from './appintments.service';

describe('AppintmentsController', () => {
  let controller: AppintmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppintmentsController],
      providers: [AppintmentsService],
    }).compile();

    controller = module.get<AppintmentsController>(AppintmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
