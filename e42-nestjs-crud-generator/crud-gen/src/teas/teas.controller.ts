import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto';
import { TeasService } from './teas.service';

@Controller('teas')
export class TeasController {
  constructor(private readonly teasService: TeasService) {}

  @Post()
  create(@Body() createTeaDto: CreateTeaDto) {
    return this.teasService.create(createTeaDto);
  }

  @Get()
  findAll() {
    return this.teasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const tea = this.teasService.findOne(id);
    if (!tea) {
      throw new NotFoundException(`No tea with id: ${id}`);
    }
    return tea;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeaDto: UpdateTeaDto) {
    return this.teasService.update(id, updateTeaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teasService.remove(id);
  }
}
