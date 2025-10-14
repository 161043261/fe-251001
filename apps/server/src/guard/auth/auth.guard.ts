import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request as ExpressRequest } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: ExpressRequest = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    try {
      if (!token) {
        throw new Error('token is required');
      }
      const tokenWithoutBearer = token.slice('Bearer '.length);
      this.jwtService.verify(tokenWithoutBearer, { secret: '161043261' });
    } catch (err) {
      Logger.error(err);
      throw new HttpException('authorized failed', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
