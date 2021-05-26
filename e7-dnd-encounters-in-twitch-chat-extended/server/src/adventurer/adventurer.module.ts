import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdventurerController } from './adventurer.controller';
import { Adventurer } from './adventurer.schema';
import { AdventurerService } from './adventurer.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Adventurer, schemaOptions: {} },
    ]),
  ],
  controllers: [AdventurerController],
  providers: [AdventurerService],
})
export class AdventurerModule {}
