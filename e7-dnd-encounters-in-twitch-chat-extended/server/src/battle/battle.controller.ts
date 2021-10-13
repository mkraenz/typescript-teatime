import { Controller, Get } from '@nestjs/common';
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
}
