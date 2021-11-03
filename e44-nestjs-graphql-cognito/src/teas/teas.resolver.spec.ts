import { Test, TestingModule } from '@nestjs/testing';
import { TeasResolver } from './teas.resolver';
import { TeasService } from './teas.service';

describe('TeasResolver', () => {
  let resolver: TeasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeasResolver, TeasService],
    }).compile();

    resolver = module.get<TeasResolver>(TeasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
