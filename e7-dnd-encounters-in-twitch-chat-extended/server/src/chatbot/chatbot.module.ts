import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Module({
  providers: [ChatbotService]
})
export class ChatbotModule {}
