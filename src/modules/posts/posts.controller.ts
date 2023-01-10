import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UsePipes, HttpCode } from '@nestjs/common';

import { getParseUUIDPipe, QueryValidationPipe } from '../../common/pipes';
import { ViewPagination } from '../../common/pagination';
import { EntityNotFoundException } from '../../common/exceptions';
import { CommentQueryDTO } from '../comments/models/comment.dto';
import { ViewComment } from '../comments/models/view-comment';

import { PostQueryDTO, CreatePostDto, UpdatePostDto } from './models/post.dto';
import { ViewPost } from './models/view-post';
import { PostsService } from './services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(protected postsService: PostsService) {}

  @Get()
  @UsePipes(new QueryValidationPipe(PostQueryDTO))
  async findAll(@Query() queryFilter: PostQueryDTO): Promise<ViewPagination<ViewPost>> {
    return await this.postsService.findAll(queryFilter);
  }

  @Get(':id')
  @UsePipes(getParseUUIDPipe())
  async findOne(@Param('id') id: string): Promise<ViewPost> {
    const post = await this.postsService.findOne(id);

    if (!post) throw new EntityNotFoundException(id);
    return post;
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<ViewPost> {
    return await this.postsService.create(createPostDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id', getParseUUIDPipe()) id: string, @Body() updatePostDto: UpdatePostDto) {
    const isUpdated = await this.postsService.update(id, updatePostDto);

    if (!isUpdated) throw new EntityNotFoundException(id);
  }

  @Delete(':id')
  @UsePipes(getParseUUIDPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const isDeleted = await this.postsService.delete(id);

    if (!isDeleted) throw new EntityNotFoundException(id);
  }

  @Get(':postId/comments')
  async findAllComments(
    @Param('postId') postId: string,
    @Query() queryFilter: CommentQueryDTO,
  ): Promise<ViewPagination<ViewComment>> {
    const comments = await this.postsService.findAllCommentsByPostId(postId, queryFilter);

    if (!comments) throw new EntityNotFoundException(postId);
    return comments;
  }
}
