import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { email: string; userId: number | string }) {
    const payload = { email: user.email, sub: user.userId };
    const access_token = this.jwtService.sign(payload);
    // Add refresh token -- same-same but different kedaluarsa only
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRt = await bcrypt.hash(refresh_token, 10);
    return {
      access_token,
      refresh_token: hashedRt,
    };
  }

  async userLogin(email: string, password: string) {
    const payload = await this.validateUser(email, password);

    if (!payload) {
      return null;
    }

    return this.login({ email, userId: payload.id });
  }

  // Add refresh Token service
  async refreshTokens(body: { userId: number }, token: string) {
    const user = await this.usersService.findOne(body.userId);
    if (!user || !user.refreshToken) throw new ForbiddenException('No no no!');

    const rTmatches = await bcrypt.compare(token, user.refreshToken || '');
    if (!rTmatches) throw new ForbiddenException('No refresh refresh club');

    const payload = { sub: user.id, email: user.email };

    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRt = await bcrypt.hash(newRefreshToken, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRt },
    });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
}

//localhost:3000/auth
// 1. ValidateUser
// 2. return access_token
