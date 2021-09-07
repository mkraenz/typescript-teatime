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

  @Get('test')
  async create() {
    const battle = await this.battles.create([
      {
        type: 'monster appeared',
        monster: {
          name: 'beholder',
          area: 'the void',
          hp: 263,
        },
        turnInterval: 30000,
      },
      { type: 'join', member: 'maceisgrace', hp: 99999, maxHp: 100000 },
      { type: 'join', member: 'typescriptteatime', hp: 99999, maxHp: 100000 },
      {
        type: 'attack',
        attacker: 'maceisgrace',
        target: 'beholder',
        isMonster: false,
      },
      {
        type: 'damage received',
        target: 'beholder',
        damage: 7306,
        hpLeft: -7306 + 263,
        isMonster: true,
      },
    ]);
    return GetBattleDto.of(battle);
  }

  @Get('test2')
  async createASync() {
    await this.battles.appendToLog({
      type: 'monster appeared',
      monster: {
        name: 'beholder',
        area: 'the void',
        hp: 263,
      },
      turnInterval: 30000,
    });
    await this.battles.appendToLog({
      type: 'join',
      member: 'maceisgrace',
      hp: 99999,
      maxHp: 100000,
    });
    await this.battles.appendToLog({
      type: 'join',
      member: 'typescriptteatime',
      hp: 99999,
      maxHp: 100000,
    });
  }
}
