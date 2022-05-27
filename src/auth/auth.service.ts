import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HmacSHA1 } from 'crypto-js';
import { ResponseException } from 'src/core/exception/ResponseException';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Payload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string) {
    const {
      salt: userSalt,
      password: userPassword,
      ...userinfo
    } = await this.userService.getUser(account);
    const securityPassword = HmacSHA1(password, userSalt).toString();
    if (securityPassword != userPassword) {
      ResponseException.Validate_Login_Error();
    }
    return userinfo;
  }

  async login(user: Omit<UserEntity, 'salt' | 'password'>) {
    const payload: Payload = { userId: user.id, account: user.account };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
