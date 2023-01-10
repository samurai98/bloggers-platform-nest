import { Injectable } from '@nestjs/common';

import { ViewPagination } from '../../common/pagination';
import { BlogsService } from '../blogs/services/blogs.service';
import { CreatePostDtoByBlogId, PostQueryDTO } from '../posts/models/post.dto';
import { ViewPost } from '../posts/models/view-post';
import { PostsService } from '../posts/services/posts.service';

@Injectable()
export class BlogPostsService {
  constructor(private readonly postsService: PostsService, private readonly blogsService: BlogsService) {}

  async findAllPostsByBlogId(blogId: string, queryFilter: PostQueryDTO): Promise<ViewPagination<ViewPost> | null> {
    if (!blogId || !(await this.blogsService.findOne(blogId))) return null;

    return await this.postsService.findAll({ ...queryFilter, blogId });
  }

  async createPostByBlogId(blogId: string, postDto: CreatePostDtoByBlogId): Promise<ViewPost | null> {
    if (!blogId || !(await this.blogsService.findOne(blogId))) return null;

    return await this.postsService.create({ ...postDto, blogId });
  }
}
