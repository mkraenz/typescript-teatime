import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdventurerDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsInt()
  experience!: number;
}
