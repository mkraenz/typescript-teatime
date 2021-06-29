import { Module } from '@nestjs/common';
import { AdventurerModule } from '../adventurer/adventurer.module';
import { ChatbotService } from './chatbot.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [AdventurerModule],
  providers: [ChatbotService, WebsocketGateway],
})
export class ChatbotModule {}
