import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @MinLength(8)
  @IsOptional()
  @Matches(/[A-Z]/, { message: 'password must contain uppercase letter' })
  @Matches(/[0-9]/, { message: 'password must contain number' })
  password?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
