import { Args, Query, Resolver } from '@nestjs/graphql';
import { Round } from 'src/entities/round.entity';
import { RoundService } from './round.service';

@Resolver(() => Round)
export class RoundResolver {
  constructor(private readonly roundService: RoundService) {}

  @Query(() => [Round], { name: 'lottery_id' })
  findAll() {
    return this.roundService.findAll();
  }

  @Query(() => Round, { name: 'round' })
  findOne(@Args('lottery_id', { type: () => Number }) lottery_id: number) {
    return this.roundService.findOne(lottery_id);
  }
}
