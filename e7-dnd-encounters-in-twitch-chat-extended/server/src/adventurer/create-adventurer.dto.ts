import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdventurerDto {
  @IsString()
  @IsNotEmpty()
  username!: string;
}
