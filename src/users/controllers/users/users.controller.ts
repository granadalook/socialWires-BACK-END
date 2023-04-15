import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/login/decorators/public.decorator';
import { JwtGuard } from 'src/login/guards/jwt.guard';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/services/users/users.service';
@ApiTags('USERS')
@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @ApiOperation({ summary: 'TRAE TODOS LOS USUARIOS' })
  findAllUser() {
    return this.usersService.findAll();
  }
  @Post()
  @Public()
  @ApiOperation({ summary: 'CREA UN NUEVO USUARIO' })
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'EDITA UN USUARIO' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINA UN USUARIO POR ID' })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
