import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ViewPagination } from '../../common/pagination';
import { EntityNotFoundException } from '../../common/exceptions';
import { CreatePostDtoByBlogId, PostQueryDTO } from '../posts/models/post.dto';
import { ViewPost } from '../posts/models/view-post';
import { BlogPostsService } from '../blogPosts/blogPosts.service';

@Controller('blogs')
export class BlogPostsController {
  constructor(protected blogPostsService: BlogPostsService) {}

  @Get(':blogId/posts')
  async findAllPosts(
    @Param('blogId') blogId: string,
    @Query() queryFilter: PostQueryDTO,
  ): Promise<ViewPagination<ViewPost>> {
    const posts = await this.blogPostsService.findAllPostsByBlogId(blogId, queryFilter);

    if (!posts) throw new EntityNotFoundException(blogId);
    return posts;
  }

  @Post(':blogId/posts')
  async createPost(@Param('blogId') blogId: string, @Body() createBlogDto: CreatePostDtoByBlogId): Promise<ViewPost> {
    const post = await this.blogPostsService.createPostByBlogId(blogId, createBlogDto);

    if (!post) throw new EntityNotFoundException(blogId);
    return post;
  }
}
