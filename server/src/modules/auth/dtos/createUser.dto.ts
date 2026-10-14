import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email can not be empty' })
  @MaxLength(256)
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password can not be empty' })
  @MaxLength(256)
  @MinLength(8, { message: 'Password must be at least 8 character' })
  password: string;
}
