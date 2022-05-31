import { Test, TestingModule } from '@nestjs/testing';
import { RoundResolver } from './round.resolver';

describe('RoundResolver', () => {
  let resolver: RoundResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundResolver],
    }).compile();

    resolver = module.get<RoundResolver>(RoundResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
