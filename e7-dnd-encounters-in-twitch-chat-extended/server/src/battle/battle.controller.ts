import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Types as Mongoose } from 'mongoose';
import { BattleService } from './battle.service';
import { GetBattleDto } from './get-battle.dto';

@Controller('battles')
export class BattleController {
  constructor(private battles: BattleService) {}

  @Get()
  async findAll() {
    const battles = await this.battles.findAll();
    return battles.map(GetBattleDto.of);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!Mongoose.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }

    const battle = await this.battles.findOne(id);
    if (!battle) {
      throw new NotFoundException();
    }
    return GetBattleDto.of(battle);
  }
}
