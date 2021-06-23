import { Module } from '@nestjs/common';
import { AdventurerModule } from '../adventurer/adventurer.module';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [AdventurerModule],
  providers: [ChatbotService],
  // TODO enable websockets again
  // providers: [ChatbotService, WebsocketGateway],
})
export class ChatbotModule {}
