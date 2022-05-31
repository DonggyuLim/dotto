import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

const id = process.env.Mongo_ID;
const pw = process.env.Mongo_PW;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `mongodb+srv://${id}:${pw}@dottodb.ktqew.mongodb.net/dOtto?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
