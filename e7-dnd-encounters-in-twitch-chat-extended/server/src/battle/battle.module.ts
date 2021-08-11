import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { BattleController } from './battle.controller';
import { Battle } from './battle.schema';
import { BattleService } from './battle.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Battle,
        schemaOptions: {
          // dont care about schema here
          strict: false,
          timestamps: true,
        },
      },
    ]),
    ChatbotModule,
  ],
  controllers: [BattleController],
  providers: [BattleService],
  exports: [],
})
export class BattleModule {}
