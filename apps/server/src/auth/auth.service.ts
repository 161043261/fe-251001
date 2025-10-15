import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  // curl http://localhost:3000/auth/login -X POST -H "Content-Type: application/json" -d '{"username": "whoami", "password": "123456"}'
  login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;

    const userGetById = {
      id: 1,
      username: 'whoami',
      password: '123456',
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

  async register(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;

    const res = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    if (res) {
      throw new HttpException(
        'username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prismaService.user.create({
      data: {
        username,
        password,
      },
    });
  }
}
