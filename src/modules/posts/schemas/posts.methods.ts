import { SchemaFactory } from '@nestjs/mongoose';
import { FilterQuery, HydratedDocument, Model } from 'mongoose';

import { UpdatePostDto } from '../models/post.dto';
import { Post } from '.';

export const PostSchema = SchemaFactory.createForClass(Post);

type PostDocument = HydratedDocument<Post, IPostMethods>;

type CreatePost = {
  postId: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  currentDate: string;
};

type Search = { blogId?: string };

interface IPostMethods {
  getFilter(search: Search): FilterQuery<Post>;

  updatePost(post: UpdatePostDto): Promise<void>;

  deletePost(): Promise<void>;
}

export interface PostDocumentModel extends Model<PostDocument> {
  findPost(id: string): Promise<PostDocument | null>;

  createPost(post: CreatePost): Promise<PostDocument>;
}

PostSchema.methods = {
  async updatePost({ title, shortDescription, content }: Partial<Post>) {
    await this.updateOne({ title, shortDescription, content });
  },

  async deletePost() {
    // TODO: added delete comments...
    await this.delete();
  },
};

PostSchema.statics = {
  getFilter({ blogId }: Search): FilterQuery<Post> {
    return blogId ? { blogId } : {};
  },

  async findPost(id: string): Promise<PostDocument | null> {
    return await this.findOne({ id }).exec();
  },

  async createPost(postData: CreatePost): Promise<PostDocument> {
    const { postId, title, shortDescription, content, blogId, currentDate } = postData;

    return new this({
      id: postId,
      title,
      shortDescription,
      content,
      // userId: currentUserId,
      blogId,
      createdAt: currentDate,
      reactions: [],
    });
  },
};
