import { PartialType } from '@nestjs/mapped-types';
import { CreateTodosDto } from './create-todo.dto';

export class UpdateTodosDto extends PartialType(CreateTodosDto) {}
