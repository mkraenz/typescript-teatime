import { Adventurer } from './adventurer.schema';

export class GetAdventurerDto {
  static of(adventurer: Adventurer) {
    return new GetAdventurerDto(
      adventurer.username,
      adventurer.level,
      adventurer.experience,
    );
  }

  constructor(
    public username: string,
    public level: number,
    public experience: number,
  ) {}
}
