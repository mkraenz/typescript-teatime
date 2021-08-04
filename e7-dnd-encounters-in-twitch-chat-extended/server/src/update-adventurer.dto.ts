import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdventurerDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsOptional()
  @IsInt()
  experience?: number;

  @IsOptional()
  @IsInt()
  hp?: number;
}
