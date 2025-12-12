import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const todoId = +req.params.id;

    const todo = await this.prisma.todos.findUnique({
      where: { id: todoId },
    });

    return todo?.userId === user.userId;
  }
}
