import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogsModule } from '../blogs/blogs.module';
import { CommentsModule } from '../comments/comments.module';

import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { Post, PostSchema } from './schemas';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), BlogsModule, CommentsModule],
  exports: [PostsService],
})
export class PostsModule {}
