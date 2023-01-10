import { SchemaFactory } from '@nestjs/mongoose';
import { FilterQuery, HydratedDocument, Model } from 'mongoose';

import { Comment } from '.';

export const CommentSchema = SchemaFactory.createForClass(Comment);

type CommentDocument = HydratedDocument<Comment, ICommentMethods>;

interface ICommentMethods {
  updateComment(comment: Partial<Comment>): Promise<void>;

  deleteComment(): Promise<void>;
}

type Search = { postId?: string };

export interface CommentDocumentModel extends Model<CommentDocument> {
  getFilter(search: Search): FilterQuery<Comment>;

  findComment(id: string): Promise<CommentDocument | null>;

  createComment(comment: Comment): Promise<CommentDocument>;
}

CommentSchema.methods = {
  async updateComment({ content }: Partial<Comment>) {
    await this.updateOne({ content });
  },

  async deleteComment() {
    await this.delete();
  },
};

CommentSchema.statics = {
  getFilter({ postId }: Search): FilterQuery<Comment> {
    return postId ? { postId } : {};
  },

  async findComment(id: string): Promise<CommentDocument | null> {
    return await this.findOne({ id }).exec();
  },

  async createComment(comment: Comment): Promise<CommentDocument> {
    return new this(comment);
  },
};
