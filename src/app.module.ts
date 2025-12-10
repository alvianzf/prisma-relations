import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
// import { TodoService } from './todo/todo.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, TodoModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
