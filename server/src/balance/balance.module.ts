import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Balance, BalanceSchema } from 'src/entities/balance.entity';
import { GetBalanceData } from 'src/jobs/get_Balance_Data';
import { BalanceResolver } from './balance.resolver';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GetBalanceData,
    MongooseModule.forFeature([
      {
        name: Balance.name,
        schema: BalanceSchema,
      },
    ]),
  ],
  providers: [BalanceService, BalanceResolver, GetBalanceData],
})
export class BalanceModule {}
