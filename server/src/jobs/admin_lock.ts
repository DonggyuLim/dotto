import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { calculateFee, GasPrice } from '@cosmjs/stargate';
import { Interval } from '@nestjs/schedule';

export class Admin_Lock {
  @Interval('Admin_Lock', 600000)
  async handleCron(): Promise<any> {
    const contractAddress: string = process.env.CONTRACT_ADDRESS;
    const contractWallet: string = process.env.CONTRACT_WALLET;
    const mnemonic: string = process.env.CONTRACT_MNEMONIC;
    const gasPrice = GasPrice.fromString('0.01utorii');
    const txFee = calculateFee(500000, gasPrice);
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'archway',
    });
    let config: any;
    let lock: any;
    let draw: any;
    let collect_counter: any;
    let collect_balance: any;

    // 컨트랙트 락
    const entrypoint1 = {
      safe_lock: {},
    };
    // 번호추첨
    const entrypoint2 = {
      draw: {},
    };
    // 복권당첨수 분류
    const entrypoint3 = {
      collect_counter: {},
    };
    // 랭킹별 당첨금액
    const entrypoint4 = {
      collect_balance: {},
    };
    const cosmwasmClient = await SigningCosmWasmClient.connectWithSigner(
      'https://rpc.torii-1.archway.tech:443',
      wallet,
    );
    try {
      lock = await cosmwasmClient.execute(
        contractWallet,
        contractAddress,
        entrypoint1,
        txFee,
      );
      draw = await cosmwasmClient.execute(
        contractWallet,
        contractAddress,
        entrypoint2,
        txFee,
      );
      collect_counter = await cosmwasmClient.execute(
        contractWallet,
        contractAddress,
        entrypoint3,
        txFee,
      );
      collect_balance = await cosmwasmClient.execute(
        contractWallet,
        contractAddress,
        entrypoint4,
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
