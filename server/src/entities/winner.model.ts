import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class Winner {
  @Field(() => String, { description: '주소' })
  addr: string;
  @Prop()
  @Field(() => Number, { description: '등수' })
  rank: number;
  @Prop()
  @Field(() => String, { description: '로또 번호' })
  ticket: string;
  @Prop()
  @Field(() => Boolean)
  claim: boolean;
}
