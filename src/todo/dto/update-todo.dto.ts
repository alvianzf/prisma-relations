import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTodosDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
