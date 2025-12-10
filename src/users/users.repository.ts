import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: { name: string; email: string; password: string }) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  findUsersWithTodos() {
    return this.prisma.user.findMany({
      include: { todos: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { todos: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
