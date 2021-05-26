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
import { GetAdventurerDto } from './get-adventurer.dto';
import { UpdateAdventurerDto } from './update-adventurer.dto';

@Controller('adventurers')
export class AdventurerController {
  constructor(private adventurers: AdventurerService) {}

  @Get()
  async findAll() {
    const adventurers = await this.adventurers.findAll();
    return adventurers.map(GetAdventurerDto.of);
  }

  @Post()
  @UseFilters(new DuplicateEntityFilter())
  async create(@Body() createAdventurerDto: CreateAdventurerDto) {
    const adventurer = await this.adventurers.create(createAdventurerDto);
    return GetAdventurerDto.of(adventurer);
  }

  @Patch()
  async update(@Body() { username, experience }: UpdateAdventurerDto) {
    const adventurer = await this.adventurers.update(username, { experience });
    return GetAdventurerDto.of(adventurer);
  }

  @Delete()
  async deleteAll() {
    await this.adventurers.deleteAll();
  }
}
