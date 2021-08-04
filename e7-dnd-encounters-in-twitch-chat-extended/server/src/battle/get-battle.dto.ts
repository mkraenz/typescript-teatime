import { IEvent } from '../domain/events';
import { Battle } from './battle.schema';

export class GetBattleDto {
  static of(battle: Battle) {
    return new GetBattleDto(battle.log);
  }

  constructor(public log: IEvent[]) {}
}
