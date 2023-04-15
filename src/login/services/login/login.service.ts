import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from 'src/login/models/token.model';

import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';

import { LoginDto } from 'src/login/dto/login.dto';
@Injectable()
export class LoginService {
  token = '';
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  generateJwt(user: LoginDto) {
    const payload: PayloadToken = { sub: user.userName };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  async validateUser(userName: string, password: string) {
    const user = await this.userService.findByUserName(userName);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('PASSWORD NO CONINCIDE');
      }
      return user;
    }
    if (!user) {
      throw new UnauthorizedException('USERNAME NO ENCONTRADO');
    }
    return user;
  }
}
