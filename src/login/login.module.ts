import { Module } from '@nestjs/common';
import { LoginController } from './controller/login/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginService } from './services/login/login.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'token',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class LoginModule {}
