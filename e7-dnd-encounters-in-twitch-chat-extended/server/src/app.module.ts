import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdventurerModule } from './adventurer/adventurer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoUriModule } from './mongo-uri/mongo-uri.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    MongoUriModule,
    TypegooseModule.forRootAsync({
      imports: [MongoUriModule],
      useFactory: (uri: string) => ({
        uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: ['MONGO_URI'],
    }),
    AdventurerModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true, whitelist: true }),
    },
    AppService,
  ],
})
export class AppModule {}
