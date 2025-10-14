import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // curl http://localhost:3000/auth/login -X POST -H "Content-Type: application/json" -d '{"username": "u", "password": "pppp"}'
  login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;

    const userGetById = {
      id: 1,
      username: 'u',
      password: 'pppp',
    };
    if (username !== userGetById.username) {
      throw new HttpException('username error', HttpStatus.BAD_REQUEST);
    }
    if (password !== userGetById.password) {
      throw new HttpException('password error', HttpStatus.BAD_REQUEST);
    }
    const token = this.jwtService.sign({ username, id: userGetById.id });
    return {
      token,
    };
  }
}
