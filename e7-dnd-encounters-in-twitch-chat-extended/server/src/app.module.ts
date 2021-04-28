import { Module } from '@nestjs/common';
import { AdventurerModule } from './adventurer/adventurer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AdventurerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
