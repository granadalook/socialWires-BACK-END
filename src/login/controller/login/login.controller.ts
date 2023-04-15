import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/login/dto/login.dto';
import { LoginService } from 'src/login/services/login/login.service';

@ApiTags('AUTENTICACION JWT')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @UseGuards(AuthGuard('authJwt'))
  @ApiOperation({ summary: 'GERERA UN JWT PARA USUARIO AUTENTICADO ' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  login(@Body() user: LoginDto) {
    return this.loginService.generateJwt(user);
  }
}
