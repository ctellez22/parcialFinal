import { Test, TestingModule } from '@nestjs/testing';
import { AppintmentsService } from './appintments.service';

describe('AppintmentsService', () => {
  let service: AppintmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppintmentsService],
    }).compile();

    service = module.get<AppintmentsService>(AppintmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
