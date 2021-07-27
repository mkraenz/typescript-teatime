import { Adventurer } from './adventurer.schema';

export class GetAdventurerDto {
  static of(adventurer: Adventurer) {
    return new GetAdventurerDto(
      adventurer.username,
      adventurer.level,
      adventurer.experience,
      adventurer.hp,
      adventurer.maxHp,
    );
  }

  constructor(
    public username: string,
    public level: number,
    public experience: number,
    public hp: number,
    public maxHp: number,
  ) {}
}
