import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { BattleController } from './battle.controller';
import { Battle, BattleSchema } from './battle.schema';
import { BattleService } from './battle.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Battle.name, schema: BattleSchema }]),
    ChatbotModule,
  ],
  controllers: [BattleController],
  providers: [BattleService],
  exports: [],
})
export class BattleModule {}
