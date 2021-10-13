import { IEvent } from '../domain/events';
import { Battle } from './battle.schema';

export class GetBattleDto {
  static of(battle: Battle) {
    return new GetBattleDto(
      // ts + typegoose dont want me to add public _id on Battle
      (battle as any)._id,
      battle.log,
      battle.party,
      battle.createdAt,
    );
  }

  constructor(
    public readonly id: string,
    public readonly log: IEvent[],
    public readonly party: string[],
    public readonly createdAt?: Date,
  ) {}
}
