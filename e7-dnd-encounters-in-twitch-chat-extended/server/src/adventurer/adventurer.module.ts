import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AdventurerController } from './adventurer.controller';
import { adventurerProviders } from './adventurer.provider';
import { AdventurerService } from './adventurer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AdventurerController],
  providers: [AdventurerService, ...adventurerProviders],
})
export class AdventurerModule {}
