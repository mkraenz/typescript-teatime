import { Type } from 'class-transformer';
import { IsEmail, IsString, Length, ValidateNested } from 'class-validator';
import { Address } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3, 255)
  @IsString()
  firstname: string;

  @Length(3, 255)
  @IsString()
  lastname: string;

  @Length(3, 255)
  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

class AddressDto implements Address {
  @Length(1, 255)
  @IsString()
  street: string;

  @Length(1, 255)
  @IsString()
  city: string;

  @Length(3, 255)
  @IsString()
  zip: string;

  @Length(3, 255)
  @IsString()
  country: string;
}
