import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UsePipes, HttpCode } from '@nestjs/common';

import { getParseUUIDPipe, QueryValidationPipe } from '../../common/pipes';
import { ViewPagination } from '../../common/pagination';
import { EntityNotFoundException } from '../../common/exceptions';

import { BlogQueryDTO, CreateBlogDto, UpdateBlogDto } from './models/blog.dto';
import { ViewBlog } from './models/view-blog';
import { BlogsService } from './services/blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(protected blogsService: BlogsService) {}

  @Get()
  @UsePipes(new QueryValidationPipe(BlogQueryDTO))
  async findAll(@Query() queryFilter: BlogQueryDTO): Promise<ViewPagination<ViewBlog>> {
    return await this.blogsService.findAll(queryFilter);
  }

  @Get(':id')
  @UsePipes(getParseUUIDPipe())
  async findOne(@Param('id') id: string): Promise<ViewBlog> {
    const blog = await this.blogsService.findOne(id);

    if (!blog) throw new EntityNotFoundException(id);
    return blog;
  }

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto): Promise<ViewBlog> {
    return await this.blogsService.create(createBlogDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id', getParseUUIDPipe()) id: string, @Body() updateBlogDto: UpdateBlogDto) {
    const isUpdated = await this.blogsService.update(id, updateBlogDto);

    if (!isUpdated) throw new EntityNotFoundException(id);
  }

  @Delete(':id')
  @UsePipes(getParseUUIDPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const isDeleted = await this.blogsService.delete(id);

    if (!isDeleted) throw new EntityNotFoundException(id);
  }
}
