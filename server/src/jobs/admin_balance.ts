import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { calculateFee, GasPrice } from '@cosmjs/stargate';
import { Interval } from '@nestjs/schedule';

export class Admin_Balance {
  @Interval('Admin_Balance', 240000)
  async handleCron(): Promise<any> {
    const contractAddress: string = process.env.CONTRACT_ADDRESS;
    const contractWallet: string = process.env.CONTRACT_WALLET;
    const mnemonic: string = process.env.CONTRACT_MNEMONIC;
    const gasPrice = GasPrice.fromString('0.01utorii');
    const txFee = calculateFee(800000, gasPrice);
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'archway',
    });
    let config: any;
    let collect_balance: any;
    //랭킹별 당첨금액
    const entrypoint1 = {
      collect_balance: {},
    };

    const cosmwasmClient = await SigningCosmWasmClient.connectWithSigner(
      'https://rpc.torii-1.archway.tech:443',
      wallet,
    );
    try {
      collect_balance = await cosmwasmClient.execute(
        contractWallet,
        contractAddress,
        entrypoint1,
        txFee,
      );
    } catch (err) {
      console.log(err);
    }

    const cosmClient = CosmWasmClient.connect(
      'https://rpc.torii-1.archway.tech:443',
    );

    const qeury_msg1: Record<string, unknown> = {
      config: {},
    };
    try {
      config = await (
        await cosmClient
      ).queryContractSmart(contractAddress, qeury_msg1);
    } catch (err) {
      console.log(err);
    }

    console.log(config);
  }
}
