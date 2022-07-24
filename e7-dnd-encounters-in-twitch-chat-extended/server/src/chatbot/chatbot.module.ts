import { Module } from '@nestjs/common';
import { AdventurerModule } from '../adventurer/adventurer.module';
import { ChatbotService } from './chatbot.service';
import { EventLogToConsoleService } from './event-log-to-console.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [AdventurerModule],
  providers: [ChatbotService, WebsocketGateway, EventLogToConsoleService],
  exports: [ChatbotService, WebsocketGateway],
})
export class ChatbotModule {}
