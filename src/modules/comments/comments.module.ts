import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsController } from './comments.controller';
import { CommentsService } from './services/comments.service';
import { Comment, CommentSchema } from './schemas';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
  exports: [CommentsService],
})
export class CommentsModule {}
