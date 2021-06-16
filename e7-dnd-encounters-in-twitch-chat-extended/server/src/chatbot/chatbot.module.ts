import { Module } from '@nestjs/common';
import { AdventurerModule } from 'src/adventurer/adventurer.module';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [AdventurerModule],
  providers: [ChatbotService],
})
export class ChatbotModule {}
