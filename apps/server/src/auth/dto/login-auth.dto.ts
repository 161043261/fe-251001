import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @MaxLength(24, { message: 'password must be less than 24 characters' })
  @MinLength(6, { message: 'password must be more than 6 characters' })
  password: string;
}
