import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // curl -X POST \
  // -H "Content-Type:application/json" \
  // -d '{"username":"whoami","password":"123456"}' \
  // http://localhost:3000/auth/login
  @Post('login')
  create(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
