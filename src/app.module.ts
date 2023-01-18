import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configuration } from './config/configuration';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { PostsModule } from './modules/posts/posts.module';
import { TestingModule } from './modules/testing/testing.module';
import { BlogPostsModule } from './modules/blogPosts/blogPosts.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRoot(configuration().database.MONGO_DB_URI),
    UsersModule,
    BlogsModule,
    PostsModule,
    BlogPostsModule,
    CommentsModule,
    TestingModule,
  ],
})
export class AppModule {}
