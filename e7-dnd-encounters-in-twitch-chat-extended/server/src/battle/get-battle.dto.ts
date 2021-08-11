import { IEvent } from '../domain/events';
import { Battle } from './battle.schema';

export class GetBattleDto {
  static of(battle: Battle) {
    return new GetBattleDto(battle.log, battle.party, battle.createdAt);
  }

  constructor(
    public readonly log: IEvent[],
    public readonly party: string[],
    public readonly createdAt?: Date,
  ) {}
}
