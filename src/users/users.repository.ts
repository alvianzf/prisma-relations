import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { common } from './password.library';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: { name: string; email: string; password: string }) {
    if (common.includes(data.password)) {
      return { message: 'password is too common' };
    }
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const userWithoutPassword: this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const {pw: data.password, ...result} = userWithoutPassword;
    return result;
  }

  findUsersWithTodos() {
    return this.prisma.user.findMany({
      include: { todos: true },
    });
  }

  findTodo(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { todos: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
