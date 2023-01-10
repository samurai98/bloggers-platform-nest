import { Controller, Get, Param, UsePipes } from '@nestjs/common';

import { getParseUUIDPipe } from '../../common/pipes';
import { EntityNotFoundException } from '../../common/exceptions';

import { ViewComment } from './models/view-comment';
import { CommentsService } from './services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(protected commentsService: CommentsService) {}

  @Get(':id')
  @UsePipes(getParseUUIDPipe())
  async findOne(@Param('id') id: string): Promise<ViewComment> {
    const comment = await this.commentsService.findOne(id);

    if (!comment) throw new EntityNotFoundException(id);
    return comment;
  }
}
