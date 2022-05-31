import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Get_Jeckpot } from './get_Jackpot.model';
import { Jackpot_Balance } from './jackpot_balance.model';
import { Winner } from './winner.model';

@Schema()
@ObjectType()
export class Round {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => Number, { description: '회차' })
  lottery_id: number; // lottey_id 변경
  @Prop()
  @Field(() => [Winner], { description: 'Winner' })
  winner: Winner[];
  @Prop()
  @Field(() => [Get_Jeckpot], { description: '당첨 번호' })
  get_jackpot: Get_Jeckpot[];
  @Prop()
  @Field(() => String, { description: '티켓 구매수' })
  count_ticket: string;
  @Prop()
  @Field(() => String, { description: '티켓 구매 유저수' })
  count_user: string;
  @Prop()
  @Field(() => [Jackpot_Balance], { description: '랭킹별 당첨금액' })
  jackpot_balance: Jackpot_Balance[];
  @Prop()
  @Field(() => [String], { description: '랭킹별 당첨자수' })
  jackpot_count: string[];
}

export const RoundSchema = SchemaFactory.createForClass(Round);
