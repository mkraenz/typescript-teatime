import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { DuplicateEntityFilter } from '../common/exception-filters/duplicate-entity.filter';
import { AdventurerService } from './adventurer.service';
import { CreateAdventurerDto } from './create-adventurer.dto';
import { UpdateAdventurerDto } from './update-adventurer.dto copy';

@Controller('adventurers')
export class AdventurerController {
  constructor(private adventurers: AdventurerService) {}

  @Get()
  findAll() {
    return this.adventurers.findAll();
  }

  @Post()
  @UseFilters(new DuplicateEntityFilter())
  create(@Body() createAdventurerDto: CreateAdventurerDto) {
    return this.adventurers.create(createAdventurerDto);
  }

  @Patch()
  update(@Body() { username, experience }: UpdateAdventurerDto) {
    return this.adventurers.update(username, { experience });
  }

  @Delete()
  async deleteAll() {
    await this.adventurers.deleteAll();
  }
}
