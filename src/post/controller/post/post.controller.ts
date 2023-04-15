import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreatePostDto } from 'src/post/dto/CreatePostDto.dto';
import { Post as post } from 'src/post/entity/post.entity';
import { PostService } from 'src/post/services/post/post.service';
@ApiTags('POST')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  @ApiOperation({
    summary: 'TRAE TODOS LOS POST',
    description:
      'Esta ruta es usada para traer  todos los post  de la base de datos',
  })
  @ApiOkResponse({
    description: 'Posts encontrado exitosamente',
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'No se encontraron post', status: 400 })
  findAllPost(): Promise<post[]> {
    return this.postService.findAll();
  }
  @Post()
  @ApiOperation({
    summary: 'CREA UN NUEVO POST',
    description:
      'Crea un nuevo post  y es guardado en base de datos  con su relacion',
  })
  @ApiOkResponse({
    description: 'Post creado correctamente',
    status: 200,
  })
  @ApiBadRequestResponse({
    description: 'Error al guardar el post',
    status: 400,
  })
  createPost(@Body() payload: CreatePostDto): Promise<post> {
    return this.postService.create(payload);
  }
}
