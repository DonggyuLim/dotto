import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Round, RoundSchema } from 'src/entities/round.entity';
import { GetRoundData } from 'src/jobs/get_Round_Data';
import { RoundResolver } from './round.resolver';
import { RoundService } from './round.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GetRoundData,
    MongooseModule.forFeature([
      {
        name: Round.name,
        schema: RoundSchema,
      },
    ]),
  ],
  providers: [RoundService, RoundResolver, GetRoundData],
})
export class RoundModule {}
