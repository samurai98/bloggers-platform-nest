import { Module } from '@nestjs/common';

import { BlogsModule } from '../blogs/blogs.module';
import { PostsModule } from '../posts/posts.module';

import { BlogPostsController } from './blogPosts.controller';
import { BlogPostsService } from './blogPosts.service';

@Module({
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
  imports: [BlogsModule, PostsModule],
})
export class BlogPostsModule {}
