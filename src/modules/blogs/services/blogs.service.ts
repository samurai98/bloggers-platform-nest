import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { generateId, getCurrentDateISO } from '../../../common/helpers/utils';
import { findPaginationEntities, ViewPagination } from '../../../common/pagination';

import { Blog, BlogDocumentModel } from '../schemas';
import { BlogQueryDTO, CreateBlogDto } from '../models/blog.dto';
import { ViewBlog } from '../models/view-blog';
import { blogMapper } from './blogs-mapper';
import { UpdateBlogDto } from '../models/blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: BlogDocumentModel) {}

  async findAll(queryFilter: BlogQueryDTO): Promise<ViewPagination<ViewBlog>> {
    const { items, ...pagination } = await findPaginationEntities<Blog>(this.blogModel, queryFilter);

    return { ...pagination, items: items.map((blog) => blogMapper(blog)) };
  }

  async findOne(id: string): Promise<ViewBlog | null> {
    const blog = await this.blogModel.findBlog(id);

    return blog && blogMapper(blog.toObject());
  }

  async create(blogDto: CreateBlogDto): Promise<ViewBlog> {
    const newBlog = await this.blogModel.createBlog({
      ...blogDto,
      id: generateId(),
      createdAt: getCurrentDateISO(),
    });

    newBlog && (await newBlog.save());
    return newBlog && blogMapper(newBlog.toObject());
  }

  async update(id: string, updateData: UpdateBlogDto): Promise<boolean> {
    const blog = await this.blogModel.findBlog(id);

    blog && (await blog.updateBlog(updateData));
    return !!blog;
  }

  async delete(id: string): Promise<boolean> {
    const blog = await this.blogModel.findBlog(id);

    blog && (await blog.deleteBlog());
    return !!blog;
  }
}
