import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class Jackpot_Balance {
  @Field(() => String, { description: '1등' })
  first: string;
  @Prop()
  @Field(() => String, { description: '2등' })
  second: string;
  @Prop()
  @Field(() => String, { description: '3등' })
  third: string;
  @Prop()
  @Field(() => String, { description: '4등' })
  fourth: string;
  @Prop()
  @Field(() => String, { description: '5등' })
  fifth: string;
}
