import { Test, TestingModule } from '@nestjs/testing';
import { AdventurerService } from './adventurer.service';

describe('AdventurerService', () => {
  let service: AdventurerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdventurerService],
    }).compile();

    service = module.get<AdventurerService>(AdventurerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
