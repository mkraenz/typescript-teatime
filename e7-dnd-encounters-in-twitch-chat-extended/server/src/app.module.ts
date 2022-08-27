import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'lodash';
import { AdventurerModule } from './adventurer/adventurer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattleModule } from './battle/battle.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { MongoUriModule } from './mongo-uri/mongo-uri.module';
import { TestWebsocketsModule } from './test-websockets/test-websockets.module';

@Module({
  imports: [
    MongoUriModule,
    MongooseModule.forRootAsync({
      imports: [MongoUriModule],
      useFactory: (uri: string) => {
        return {
          uri,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
      inject: ['MONGO_URI'],
    }),
    AdventurerModule,
    ChatbotModule,
    BattleModule,
    TestWebsocketsModule,
    ServeStaticModule.forRoot({
      rootPath: join([__dirname, '..', '..', 'teawars', 'build'], '/'),
    }),
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
