import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // curl http://localhost:3000/auth/login -X POST -H "Content-Type: application/json" -d '{"username": "whoami", "password": "123456"}'
  @Post('login')
  create(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  // curl http://localhost:3000/auth/register -X POST -H "Content-Type: application/json" -d '{"username": "user", "password": "123456"}'
  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
}
