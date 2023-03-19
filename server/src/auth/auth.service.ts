import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { BasicUserDto } from 'src/user/dto/basic-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const userDataToSend = {
      name: payload.name,
      email: payload.email,
      role: payload.role,
    }

    return {
      ...userDataToSend,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<BasicUserDto> {
    const validatedUser = await this.userService.isPasswordValid(email, password);

    if (!validatedUser) {
      throw new UnauthorizedError(
        'Email address or password provided is incorrect.',
      );
    }

    return validatedUser;
  }
}
