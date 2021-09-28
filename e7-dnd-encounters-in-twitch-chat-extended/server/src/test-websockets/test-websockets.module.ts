import { Module } from '@nestjs/common';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { TestWebsocketsController } from './test-websockets.controller';

@Module({
  imports: [ChatbotModule],
  controllers:
    process.env.INSECURELY_EXPOSE_TEST_WEBSOCKETS_ENDPOINT === 'true'
      ? [TestWebsocketsController]
      : [],
})
export class TestWebsocketsModule {}
