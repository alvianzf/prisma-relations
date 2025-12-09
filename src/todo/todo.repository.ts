import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodosDto } from './dto/create-todo.dto';
import { UpdateTodosDto } from './dto/update-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  findTodos() {
    return this.prisma.todos.findMany();
  }

  findOne(id: number) {
    return this.prisma.todos.findUnique({ where: { id } });
  }

  createTodo(dto: CreateTodosDto) {
    return this.prisma.todos.create({ data: dto });
  }

  updateTodo(id: number, dto: UpdateTodosDto) {
    return this.prisma.todos.update({
      where: { id },
      data: dto
    });
  }

  findTodosWithUser() {
    return this.prisma.todos.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true}
        }
      }
    })
  }

  removeTodo(id: number) {
    return this.prisma.todos.delete({ where: { id } });
  }
}
