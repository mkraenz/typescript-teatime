import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// TODO move to correct directory
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
