import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTodosDto {
  @IsString()
  title: string;
  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
