import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

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
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
