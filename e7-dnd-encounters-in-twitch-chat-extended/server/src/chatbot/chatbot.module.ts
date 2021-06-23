import { Module } from '@nestjs/common';
import { AdventurerModule } from '../adventurer/adventurer.module';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [AdventurerModule],
  providers: [ChatbotService],
})
export class ChatbotModule {}
