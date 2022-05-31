import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance } from 'src/entities/balance.entity';
import { GetBalanceData } from 'src/jobs/get_Balance_Data';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name)
    private readonly balanceModel: Model<Balance>,
  ) {}
  async findAll() {
    const getData = new GetBalanceData();
    const data = await getData.handleCron();
    const id = '6292356c4ba97f45bd8e7223';
    const inputData = await this.balanceModel
      .findOneAndUpdate({ _id: id }, { balance: data }, { new: true })
      .exec();
    console.log(data);

    console.log(inputData);

    return this.balanceModel.find().exec();
  }
}
