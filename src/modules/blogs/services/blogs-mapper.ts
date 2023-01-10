import { Blog } from '../schemas';
import { ViewBlog } from '../models/view-blog';

export const blogMapper = (blogDB: Blog): ViewBlog => {
  const { id, name, websiteUrl, description, createdAt } = blogDB;

  return { id, name, websiteUrl, description, createdAt };
};
