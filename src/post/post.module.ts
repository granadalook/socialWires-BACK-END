import { Module } from '@nestjs/common';
import { Post } from './entity/post.entity';
import { PostController } from './controller/post/post.controller';
import { PostService } from './services/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
