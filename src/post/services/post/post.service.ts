import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/post/dto/CreatePostDto.dto';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';

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
      where: { id: data.userId },
    });
    newPost.user = user;
    return this.postRepo.save(newPost);
  }
}
