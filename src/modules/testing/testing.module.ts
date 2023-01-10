import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../users/schemas';
import { Blog, BlogSchema } from '../blogs/schemas';
import { Post, PostSchema } from '../posts/schemas';
import { Comment, CommentSchema } from '../comments/schemas';

import { TestingController } from './testing.controller';
import { TestingService } from './testing.service';

@Module({
  controllers: [TestingController],
  providers: [TestingService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
})
export class TestingModule {}
