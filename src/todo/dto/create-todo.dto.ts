import { IsBoolean, IsString } from 'class-validator';

export class CreateTodosDto {
  @IsString()
  title: string;
  @IsString()
  description: string;

  @IsBoolean()
  completed?: boolean;
}
