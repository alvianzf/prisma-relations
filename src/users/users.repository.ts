import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUser(data: { name: string; email: string }) {
    return this.prisma.user.create({ data });
  }

  findUsersWithTodos() {
    return this.prisma.user.findMany({
      include: {
        todos: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { todos: true },
    });
  }
}
