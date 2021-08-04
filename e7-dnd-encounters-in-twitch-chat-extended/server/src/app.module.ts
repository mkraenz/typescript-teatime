import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdventurerModule } from './adventurer/adventurer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattleModule } from './battle/battle.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { toConfig } from './env';
import { MongoUriModule } from './mongo-uri/mongo-uri.module';

@Module({
  imports: [
    MongoUriModule,
    TypegooseModule.forRootAsync({
      imports: [MongoUriModule],
      useFactory: (uri: string) => {
        const env = process.env;
        const cfg = toConfig(env);
        return cfg.DATABASE_USE_TLS
          ? {
              uri,
              ssl: true,
              tlsInsecure: true,
              tlsAllowInvalidHostnames: true,
              tlsCAFile: 'rds-combined-ca-bundle.pem',
              auth: {
                password: cfg.database.password,
                user: cfg.database.username,
              },
              readPreference: 'secondaryPreferred',
              useUnifiedTopology: true,
              retryAttempts: 5,
              useNewUrlParser: true,
              replicaSet: cfg.database.replicaSet,
            }
          : {
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
