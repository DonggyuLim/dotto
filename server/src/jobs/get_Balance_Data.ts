import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Cron } from '@nestjs/schedule';

export class GetBalanceData {
  @Cron('* * * * * *', { name: 'GetBalanceData' })
  async handleCron(): Promise<any> {
    const contractAddress: string = process.env.CONTRACT_ADDRESS;

    let data: any;

    const cosmClient = CosmWasmClient.connect(
      'https://rpc.torii-1.archway.tech:443',
    );

    //Get Balance
    const query_msg: Record<string, unknown> = {
      balance: {
        lottery_id: 3,
      },
    };
    try {
      data = await (
        await cosmClient
      ).queryContractSmart(contractAddress, query_msg);
    } catch (err) {
      console.log(err);
    }

    return data;
  }
}
