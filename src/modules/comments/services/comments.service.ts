import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { findPaginationEntities, ViewPagination } from '../../../common/pagination';

import { Comment, CommentDocumentModel } from '../schemas';
import { CommentQueryDTO } from '../models/comment.dto';
import { ViewComment } from '../models/view-comment';
import { commentMapper } from './comments-mapper';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: CommentDocumentModel) {}

  async findAll(queryFilter: CommentQueryDTO): Promise<ViewPagination<ViewComment>> {
    const { items, ...pagination } = await findPaginationEntities<Comment>(this.commentModel, queryFilter);

    return {
      ...pagination,
      items: items.map((comment) =>
        commentMapper({ ...comment, currentUserId: 'fakeId', commentatorLogin: 'fakeLogin' }),
      ),
    };
  }

  async findOne(id: string): Promise<ViewComment | null> {
    const comment = await this.commentModel.findComment(id);

    return comment && commentMapper({ ...comment.toObject(), currentUserId: 'fakeId', commentatorLogin: 'fakeLogin' });
  }
}
