import { InjectModel } from '@nestjs/mongoose';

import { Blog, BlogDocumentModel } from '../blogs/schemas';
import { User, UserDocumentModel } from '../users/schemas';
import { Post, PostDocumentModel } from '../posts/schemas';
import { Comment, CommentDocumentModel } from '../comments/schemas';

export class TestingService {
  constructor(
    @InjectModel(User.name) private userModel: UserDocumentModel,
    @InjectModel(Blog.name) private blogModel: BlogDocumentModel,
    @InjectModel(Post.name) private postModel: PostDocumentModel,
    @InjectModel(Comment.name) private commentModel: CommentDocumentModel,
  ) {}

  async dropAll() {
    try {
      const promises = [
        this.userModel.deleteMany({}),
        this.blogModel.deleteMany({}),
        this.postModel.deleteMany({}),
        this.commentModel.deleteMany({}),
      ];

      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  }
}
