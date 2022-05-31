import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class Get_Jeckpot {
  @Field(() => String)
  worker: string;
  @Prop()
  @Field(() => String)
  round: string;
}
