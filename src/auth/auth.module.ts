import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';

const JWT_SECRET = process.env.JWT_SECRET;

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET || 'fallback',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
