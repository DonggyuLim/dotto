import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Round } from 'src/entities/round.entity';
import { GetRoundData } from 'src/jobs/get_Round_Data';

@Injectable()
export class RoundService {
  constructor(
    @InjectModel(Round.name)
    private readonly roundModel: Model<Round>,
  ) {}
  getRoundData() {
    const getData = new GetRoundData();
    return getData.handleCron();
  }

  findAll() {
    return this.roundModel.find().exec();
  }
  async findOne(round: number) {
    const selectRound = await this.roundModel
      .findOne({
        round: round,
      })
      .exec();

    if (!selectRound) {
      throw new NotFoundException(` Round ${round} not found`);
    }
    return selectRound;
  }
}
