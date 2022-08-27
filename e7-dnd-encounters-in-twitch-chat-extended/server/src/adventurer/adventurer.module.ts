import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdventurerController } from './adventurer.controller';
import { Adventurer, AdventurerSchema } from './adventurer.schema';
import { AdventurerService } from './adventurer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Adventurer.name, schema: AdventurerSchema },
    ]),
  ],
  controllers: [AdventurerController],
  providers: [AdventurerService],
  exports: [AdventurerService],
})
export class AdventurerModule {}
