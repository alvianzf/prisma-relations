import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'password must contain uppercase letter' })
  @Matches(/[0-9]/, { message: 'password must contain number' })
  password: string;

  @IsString()
  @IsOptional()
  refreshToken: string;
}
