import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  loginUser(@Body() data: { email: string; password: string }) {
    return this.authService.userLogin(data.email, data.password);
  }

  @Post('refresh')
  async refresh(@Request() req, @Body() user) {
    return this.authService.refreshTokens(user.userId, user.token);
  }
}
