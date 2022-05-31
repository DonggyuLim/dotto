import { Test, TestingModule } from '@nestjs/testing';
import { BalanceResolver } from './balance.resolver';

describe('BalanceResolver', () => {
  let resolver: BalanceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceResolver],
    }).compile();

    resolver = module.get<BalanceResolver>(BalanceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
