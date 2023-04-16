import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
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
  @ApiNotFoundResponse({ description: 'No se encontraron post', status: 404 })
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
  @ApiNotFoundResponse({
    description: 'Error al guardar el post',
    status: 404,
  })
  createPost(@Body() payload: CreatePostDto): Promise<post> {
    return this.postService.create(payload);
  }

  @Get('filterByDate')
  @ApiOperation({
    summary: 'FILTRA LOS POSR POR FECHAS DE CREACION',
    description: 'Se usa  para filtrar los post por fechas de creacion',
  })
  @ApiOkResponse({
    description: 'Post encontrados corrctamente',
    status: 200,
  })
  @ApiNotFoundResponse({ description: 'Error al buscar Post ', status: 404 })
  async filterByDate(
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
  ): Promise<post[]> {
    return this.postService.findByDate(fromDate, toDate);
  }
  @Get('filterAll/:text')
  @ApiOperation({
    summary: 'FILTRA LOS POST POR  SUS ATRIBUTOS',
    description:
      'Busca en la base de datos cualquier concidencia  basado en sus atributos',
  })
  @ApiOkResponse({
    description: 'post encontrados exitosamente',
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'Error al buscar post',
    status: 404,
  })
  getAllByFilter(@Param('text') text: string): Promise<post[]> {
    return this.postService.findByFilter(text);
  }
}
