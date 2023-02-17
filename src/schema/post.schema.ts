import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  name: z.string(),
  content: z.string(),
  userId: z.number(),
});

export const PostsSchema = z.array(PostSchema);

export const PostsResponseSchema = z.object({
  posts: PostsSchema,
});

export const PostResponseSchema = z.object({
  post: PostSchema,
});
