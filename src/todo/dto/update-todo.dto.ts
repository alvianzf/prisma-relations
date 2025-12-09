import { IsBoolean, IsString } from 'class-validator';

export class UpdateTodosDto {
  @IsString()
  title?: string;
  @IsString()
  description?: string;

  @IsBoolean()
  completed?: boolean;
}
