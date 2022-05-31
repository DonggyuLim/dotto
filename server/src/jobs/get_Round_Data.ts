import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Round, RoundSchema } from 'src/entities/round.entity';

let lottery_count: number = 1;
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Round.name,
        schema: RoundSchema,
      },
    ]),
  ],
})
export class GetRoundData {
  @InjectModel(Round.name)
  private readonly roundModel: Model<Round>;
  @Cron('* * 23 * * *', { name: 'GetRoundData' })
  // 1 구매 못하게 lock
  // 2 컨트랙트 실행 쿼리문 -> 마지막 lock 해제
  // 3 데이터 긁어오기
  // 4 DB 저장
  // 5 Count up -- lottery_id
  async handleCron(): Promise<any> {
    const contractAddress: string = process.env.CONTRACT_ADDRESS;
    let winner: any;
    let get_jackpot: any;
    let count_ticket: any;
    let count_user: any;
    let jackpot_balance: any;
    let jackpot_count: any;

    const round_check: any = await this.roundModel
      .findOne({ lottery_id: lottery_count })
      .exec();

    if (round_check) {
      lottery_count++;
      console.log('---------------------------');
      console.log(lottery_count);
      console.log('---------------------------');
    }

    // CosmWasmClient.connet에 rpc가 들어가 있어야함
    const cosmClient = CosmWasmClient.connect(
      'https://rpc.torii-1.archway.tech:443',
    );

    // Get Winner
    const qeury_msg1: Record<string, unknown> = {
      winner: {
        lottery_id: lottery_count,
      },
    };
    try {
      winner = await (
        await cosmClient
      ).queryContractSmart(contractAddress, qeury_msg1);
    } catch (err) {
      console.log(err);
    }

    // Get Jackpot Number
    const qeury_msg2: Record<string, unknown> = {
      get_jackpot: {
        lottery_id: lottery_count,
      },
    };
    try {
      get_jackpot = await (
        await cosmClient
      ).queryContractSmart(contractAddress, qeury_msg2);
    } catch (err) {
      console.log(err);
    }

    // Get Count Ticket
    const qeury_msg3: Record<string, unknown> = {
      count_ticket: {
        lottery_id: lottery_count,
      },
    };
    try {
      count_ticket = await (
        await cosmClient
      ).queryContractSmart(contractAddress, qeury_msg3);
    } catch (err) {
      console.log(err);
    }

    // Get Count User
    const qeury_msg4: Record<string, unknown> = {
      count_user: {
        lottery_id: lottery_count,
      },
    };
    try {
      count_user = await (
        await cosmClient
      ).queryContractSmart(contractAddress, qeury_msg4);
    } catch (err) {
      console.log(err);
    }

    // Get Jackpot Balance
    const qeury_msg5: Record<string, unknown> = {
      jackpot_balance: {
        lottery_id: lottery_count,
      },
    };
    try {
      jackpot_balance = await (
        await cosmClient
      ).queryContractSmart(contractAddress, qeury_msg5);
    } catch (err) {
      console.log(err);
    }

    // Get Jackpot Count
    const qeury_msg6: Record<string, unknown> = {
      jackpot_count: {
        lottery_id: lottery_count,
      },
    };
    try {
      jackpot_count = await (
        await cosmClient
      ).queryContractSmart(contractAddress, qeury_msg6);
    } catch (err) {
      console.log(err);
    }

    if (!round_check) {
      const round = new this.roundModel({
        lottery_id: lottery_count,
        winner: winner,
        get_jackpot: get_jackpot,
        count_ticket: count_ticket,
        count_user: count_user,
        jackpot_balance: jackpot_balance,
        jackpot_count: jackpot_count,
      });
      await round.save();
      console.log(round);
    }
  }
}
