import { Test, TestingModule } from '@nestjs/testing';
import { TeasService } from './teas.service';

describe('TeasService', () => {
  let service: TeasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeasService],
    }).compile();

    service = module.get<TeasService>(TeasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
