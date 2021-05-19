import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdventurerModule } from './adventurer/adventurer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoUriModule } from './mongo-uri/mongo-uri.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
