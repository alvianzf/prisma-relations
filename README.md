# NestJS + Prisma JWT Authentication Guide

## Overview

This guide shows how to:

* Add JWT authentication to an existing NestJS + Prisma setup
* Protect routes using `JwtAuthGuard`
* Generate and validate tokens for users

---

## 1️⃣ Install Dependencies

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
npm install -D @types/passport-jwt @types/bcryptjs
```

---

## 2️⃣ Create Auth Service

```ts
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
```

* `validateUser` checks credentials against Prisma
* `login` generates a JWT with the user’s `id`, `email`, and `role`

---

## 3️⃣ JWT Strategy

```ts
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
```

* `super()` passes config to Passport
* `validate()` returns the authenticated user object, which gets attached to `req.user`

---

## 4️⃣ JWT Guard

```ts
// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

Use it on routes:

```ts
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Request() req) {
  return req.user;
}
```

* Any route protected with `@UseGuards(JwtAuthGuard)` requires a valid Bearer token

---

## 5️⃣ Auth Module

```ts
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

* Uses `UsersModule` to validate users
* Exports `AuthService` for login/signup usage

---

## 6️⃣ Usage Flow

1. **Signup**

   * Create user via `UsersService` with hashed password

2. **Login**

   * `POST /auth/login` with `email` + `password`
   * Returns JWT in response

3. **Access protected route**

   * Send `Authorization: Bearer <token>` header
   * `JwtAuthGuard` validates token and attaches `req.user`

---

## 7️⃣ Notes

* Always hash passwords before saving to Prisma
* `secretOrKey` **must never be undefined**
* Guards only protect controllers; controllers themselves cannot be exported

---
