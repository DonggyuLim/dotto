import { CosmWasmClient, JsonObject } from '@cosmjs/cosmwasm-stargate';
import { Cron } from '@nestjs/schedule';

export class GetData {
  constructor(private signClient: CosmWasmClient) {}
  @Cron('* * * * * *', { name: 'getData' })
  async handleCron(): Promise<any> | undefined {
    const contractAddress: string = process.env.NEST_PUBLIC_CONTRACT_ADDRESS;
    const qeury_msg1: Record<string, unknown> = {
      combination: {
        lottery_id: 1,
      },
    };
    const denom: string = 'utorii';
    await this.signClient
      // .getChainId()
      .getBalance(contractAddress, denom)
      .then((res: any) => {
        const { amount, denom }: { amount: number; denom: string } = res;

        console.log(amount, denom);
      });
    // .queryContractSmart(contractAddress, qeury_msg1)
    // .then((res: any) => {
    //   console.log('--------- Combination ---------');
    //   console.log(res);
    // })
    // .catch((err: any) => {
    //   console.log(err);
    // });
  }
}
