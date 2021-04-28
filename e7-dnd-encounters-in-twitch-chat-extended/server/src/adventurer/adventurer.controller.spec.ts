import { Test, TestingModule } from '@nestjs/testing';
import { AdventurerController } from './adventurer.controller';

describe('AdventurerController', () => {
  let controller: AdventurerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdventurerController],
    }).compile();

    controller = module.get<AdventurerController>(AdventurerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
