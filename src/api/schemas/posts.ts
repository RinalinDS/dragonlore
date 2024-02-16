import { z } from 'zod';

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

export const PostsArraySchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;
export type PostArr = z.infer<typeof PostsArraySchema>;
