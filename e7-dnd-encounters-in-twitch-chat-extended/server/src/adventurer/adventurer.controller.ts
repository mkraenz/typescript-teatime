import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { DuplicateEntityFilter } from '../common/exception-filters/duplicate-entity.filter';
import { UpdateAdventurerDto } from './update-adventurer.dto';
import { AdventurerService } from './adventurer.service';
import { CreateAdventurerDto } from './create-adventurer.dto';
import { GetAdventurerDto } from './get-adventurer.dto';

@Controller('adventurers')
export class AdventurerController {
  constructor(private adventurers: AdventurerService) {}

  @Get()
  async findAll() {
    const adventurers = await this.adventurers.findAll();
    return adventurers.map(GetAdventurerDto.of);
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const adventurer = await this.adventurers.findOne(username);
    if (!adventurer) {
      throw new NotFoundException(
        `Could not find user by username ${username}`,
      );
    }
    return GetAdventurerDto.of(adventurer);
  }

  @Post()
  @UseFilters(new DuplicateEntityFilter())
  async create(@Body() createAdventurerDto: CreateAdventurerDto) {
    const adventurer = await this.adventurers.create(createAdventurerDto);
    return GetAdventurerDto.of(adventurer);
  }

  @Patch()
  async update(@Body() { username, experience, hp }: UpdateAdventurerDto) {
    const adventurer = await this.adventurers.update(username, {
      experience,
      hp,
    });
    return GetAdventurerDto.of(adventurer);
  }

  @Delete()
  async deleteAll() {
    await this.adventurers.deleteAll();
  }
}
