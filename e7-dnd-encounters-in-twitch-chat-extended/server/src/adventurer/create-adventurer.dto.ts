import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdventurerDto {
  @IsString() // TODO
  @IsNotEmpty()
  username!: string;
}
