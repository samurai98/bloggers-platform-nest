import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogsController } from './blogs.controller';
import { BlogsService } from './services/blogs.service';
import { Blog, BlogSchema } from './schemas';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
  exports: [BlogsService],
})
export class BlogsModule {}
