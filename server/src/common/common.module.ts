import { Module } from '@nestjs/common';
import { GrahpqlModule } from 'src/common/grahpql.module';
import { ConfigModule } from './config.module';
import { MongoModule } from './mongo.module';

@Module({
  imports: [ConfigModule, GrahpqlModule, MongoModule],
  exports: [ConfigModule, GrahpqlModule, MongoModule],
})
export class CommonModule {}
