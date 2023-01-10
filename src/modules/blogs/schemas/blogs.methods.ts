import { SchemaFactory } from '@nestjs/mongoose';
import { FilterQuery, HydratedDocument, Model } from 'mongoose';

import { Blog } from '.';

export const BlogSchema = SchemaFactory.createForClass(Blog);

type BlogDocument = HydratedDocument<Blog, IBlogMethods>;

interface IBlogMethods {
  updateBlog(blog: Partial<Blog>): Promise<void>;

  deleteBlog(): Promise<void>;
}

type Search = { searchNameTerm: string };

export interface BlogDocumentModel extends Model<BlogDocument> {
  getFilter(search: Search): FilterQuery<Blog>;

  findBlog(id: string): Promise<BlogDocument | null>;

  createBlog(blog: Blog): Promise<BlogDocument>;
}

BlogSchema.methods = {
  async updateBlog({ name, websiteUrl, description }: Partial<Blog>) {
    await this.updateOne({ name, websiteUrl, description });
  },

  async deleteBlog() {
    // TODO: added delete posts, comments...
    await this.delete();
  },
};

BlogSchema.statics = {
  getFilter(search: Search): FilterQuery<Blog> {
    return { name: { $regex: new RegExp(`${search.searchNameTerm}`, 'i') } };
  },

  async findBlog(id: string): Promise<BlogDocument | null> {
    return await this.findOne({ id }).exec();
  },

  async createBlog(blog: Blog): Promise<BlogDocument> {
    return new this(blog);
  },
};
