import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, PrismaService],
})
export class TodoModule {}
