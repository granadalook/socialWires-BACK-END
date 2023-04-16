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
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/login/decorators/public.decorator';
import { JwtGuard } from 'src/login/guards/jwt.guard';
import { Post as post } from 'src/post/entity/post.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/services/users/users.service';
@ApiTags('USERS')
@Controller('users')
//@UseGuards(JwtGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @ApiOperation({
    summary: 'TRAE TODOS LOS USUARIOS',
    description: 'Trae  todos los usuaros  guardados en base de datos',
  })
  @ApiOkResponse({
    description: 'Usuarios encontrados exitosamente',
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'Error al buscar usuarios',
    status: 404,
  })
  findAllUser(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get('userName/:UserName')
  @ApiOperation({
    summary: 'TRAE UN USUARIO POR SU NOMBRE DE USUARIO',
    description: 'Trae  un usuario  pasando por parametro su nombre de usuario',
  })
  @ApiOkResponse({
    description: 'Usuario encontrados exitosamente',
    status: 200,
  })
  @ApiNotFoundResponse({ description: 'Error al buscar usuario', status: 404 })
  async findByUserName(@Param('UserName') UserName: string) {
    const user = await this.usersService.findByUserName(UserName);
    return user.posts;
  }
  @Get('filterAll/:text')
  @ApiOperation({
    summary: 'FILTRA LOS USUARIOS POR  SUS ATRIBUTOS',
    description:
      'Busca en la base de datos cualquier concidencia  basado en sus atributos',
  })
  @ApiOkResponse({
    description: 'Usuarios encontrados exitosamente',
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'Error al buscar usuarios',
    status: 404,
  })
  getAllByFilter(@Param('text') text: string): Promise<User[]> {
    return this.usersService.findByFilter(text);
  }
  @Post()
  @Public()
  @ApiOperation({
    summary: 'CREA UN NUEVO USUARIO',
    description: 'Crea un  usuario pasando sus atributos por el body ',
  })
  @ApiOkResponse({
    description: 'Usuario creado  exitosamente',
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'Error al crear usuario',
    status: 404,
  })
  createUser(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'EDITA UN USUARIO',
    description: 'Sirve para editar un  usuario que ya este registado',
  })
  @ApiOkResponse({
    description: 'Usuario editado exitosamente',
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'Error al editar usuarios',
    status: 404,
  })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, payload);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'ELIMINA UN USUARIO POR ID',
    description: 'Elimina un usuario registrado en base de datos',
  })
  @ApiOkResponse({
    description: 'Usuario eliminado exitosamente',
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'Error al eliminar  usuarios',
    status: 404,
  })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
