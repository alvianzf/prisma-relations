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
  async refresh(@Request() req, @Body() userId) {
    return this.authService.refreshTokens(
      userId,
      req.header.authorization?.split(' ')[1],
    );
  }
}
