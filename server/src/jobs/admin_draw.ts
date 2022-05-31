import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { calculateFee, GasPrice } from '@cosmjs/stargate';
import { Interval } from '@nestjs/schedule';

export class Admin_Draw {
  @Interval('Admin_Draw', 120000)
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
    let draw: any;

    // 복권번호 추첨
    const entrypoint1 = {
      draw: {},
    };

    const cosmwasmClient = await SigningCosmWasmClient.connectWithSigner(
      'https://rpc.torii-1.archway.tech:443',
      wallet,
    );
    try {
      draw = await cosmwasmClient.execute(
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
