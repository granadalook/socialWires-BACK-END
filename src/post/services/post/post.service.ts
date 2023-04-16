import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/post/dto/CreatePostDto.dto';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/users/entity/user.entity';
import { Repository, Between, Like } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: ['user'] });
  }
  async create(data: CreatePostDto): Promise<Post> {
    const newPost = this.postRepo.create(data);
    const user: User = await this.userRepo.findOne({
      where: { userName: data.userName },
    });
    newPost.user = user;
    if (!this.postRepo.save(newPost)) {
      throw new NotFoundException(`ERROR  AL CREAR POST INTENTE DE NUEVO`);
    }
    return this.postRepo.save(newPost);
  }
  async findByDate(frontDate: Date, toDate: Date): Promise<Post[]> {
    const posts = await this.postRepo.find({
      where: {
        fechaCreacion: Between(frontDate, toDate),
      },
      relations: ['user'],
    });
    if (posts.length === 0) {
      throw new NotFoundException(
        `NO EXISTEN POST  EN LAS FECHAS SELECCIONADAS`,
      );
    }
    return posts;
  }
  async findByFilter(text: string): Promise<Post[]> {
    const post = await this.postRepo.find({
      where: [{ title: Like(`%${text}%`) }, { texto: Like(`%${text}%`) }],
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`POST DE  ${text}  NO EXISTE`);
    }
    return post;
  }
}
