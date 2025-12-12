import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    // DTO must include password
    return this.repo.createUser(createUserDto);
  }

  findByEmail(email: string) {
    return this.repo.findByEmail(email);
  }

  findUserWithTodo(id: number) {
    return this.repo.findTodo(id);
  }

  findAll() {
    return this.repo.findUsersWithTodos();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // Implement prisma.user.update here if needed
    return this.repo.update(id, updateUserDto);
  }

  remove(id: number) {
    // Implement prisma.user.delete here if needed
    return `This action removes a #${id} user`;
  }
}
