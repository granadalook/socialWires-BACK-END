import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'authJwt') {
  constructor(private loginService: LoginService) {
    super({
      usernameField: 'userName',
    });
  }

  async validate(userName: string, password: string) {
    const user = await this.loginService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException('NO HAY COINCIDENCIAS');
    }
    return user;
  }
}
