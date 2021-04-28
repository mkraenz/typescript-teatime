import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdventurerService } from './adventurer.service';
import { CreateAdventurerDto } from './create-adventurer.dto';

@Controller('adventurers')
export class AdventurerController {
  constructor(private adventurers: AdventurerService) {}

  @Get()
  findAll() {
    return this.adventurers.findAll();
  }

  @Post()
  create(@Body() createAdventurerDto: CreateAdventurerDto) {
    return this.adventurers.create(createAdventurerDto);
  }
}
