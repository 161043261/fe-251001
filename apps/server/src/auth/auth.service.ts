import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;

    const userGetById = {
      id: 1,
      username: 'usernameGetById',
      password: 'passwordGetById',
    };
    if (username !== userGetById.username) {
      throw new HttpException('username error', 401);
    }
    if (password !== userGetById.password) {
      throw new HttpException('password error', 401);
    }
    const token = this.jwtService.sign({ username, id: userGetById.id });

    return {
      token,
    };
  }
}
