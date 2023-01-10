import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { generateId, getCurrentDateISO } from '../../../common/helpers/utils';
import { findPaginationEntities, ViewPagination } from '../../../common/pagination';
import { BlogsService } from '../../blogs/services/blogs.service';
import { CommentsService } from '../../comments/services/comments.service';
import { CommentQueryDTO } from '../../comments/models/comment.dto';
import { ViewComment } from '../../comments/models/view-comment';

import { Post, PostDocumentModel } from '../schemas';
import { PostQueryDTO, CreatePostDto } from '../models/post.dto';
import { ViewPost } from '../models/view-post';
import { postMapper } from './posts-mapper';
import { UpdatePostDto } from '../models/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: PostDocumentModel,
    private readonly blogsService: BlogsService,
    protected commentsService: CommentsService,
  ) {}

  async findAll(queryFilter: PostQueryDTO): Promise<ViewPagination<ViewPost>> {
    const { items, ...pagination } = await findPaginationEntities<Post>(this.postModel, queryFilter);

    return { ...pagination, items: items.map((post) => postMapper(post)) };
  }

  async findOne(id: string): Promise<ViewPost | null> {
    const post = await this.postModel.findPost(id);

    if (!post) return null;

    const blogName = (await this.blogsService.findOne(post.blogId))?.name;

    blogName && (await post.save());
    return blogName && postMapper(post.toObject());
  }

  async create(postDto: CreatePostDto): Promise<ViewPost | null> {
    const blogName = (await this.blogsService.findOne(postDto.blogId))?.name;
    const newPost =
      blogName &&
      (await this.postModel.createPost({
        ...postDto,
        postId: generateId(),
        currentDate: getCurrentDateISO(),
        blogName,
      }));

    if (!newPost && blogName) return null;

    blogName && (await newPost.save());
    return blogName && postMapper(newPost.toObject());
  }

  async update(id: string, updateData: UpdatePostDto): Promise<boolean> {
    const post = await this.postModel.findPost(id);

    post && (await post.updatePost(updateData));
    return !!post;
  }

  async delete(id: string): Promise<boolean> {
    const post = await this.postModel.findPost(id);

    post && (await post.deletePost());
    return !!post;
  }

  async findAllCommentsByPostId(
    postId: string,
    queryFilter: CommentQueryDTO,
  ): Promise<ViewPagination<ViewComment> | null> {
    if (!postId || !(await this.findOne(postId))) return null;

    return await this.commentsService.findAll({ ...queryFilter, postId });
  }
}
