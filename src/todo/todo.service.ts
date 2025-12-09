import { Injectable } from '@nestjs/common';
import { CreateTodosDto } from './dto/create-todo.dto';
import { UpdateTodosDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {}
  create(dto: CreateTodosDto) {
    return this.repo.createTodo(dto);
  }

  findAll() {
    return this.repo.findTodos();
  }

  findAllWithUser() {
    return this.repo.findTodosWithUser();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, dto: UpdateTodosDto) {
    return this.repo.updateTodo(id, dto);
  }

  remove(id: number) {
    return this.repo.removeTodo(id);
  }
}
