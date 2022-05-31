import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Balance } from 'src/entities/balance.entity';
import { BalanceService } from './balance.service';

@Resolver(() => Balance)
export class BalanceResolver {
  constructor(private readonly balanceService: BalanceService) {}

  @Query(() => [Balance], { name: 'balances' })
  getData() {
    return this.balanceService.findAll();
  }
}
