import { z } from 'zod';

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

export const commentSchema = z.object({
  id: z.number(),
  postId: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

export const PostsArraySchema = z.array(postSchema);
export const CommentArraySchema = z.array(commentSchema);

export type Post = z.infer<typeof postSchema>;
export type PostArr = z.infer<typeof PostsArraySchema>;

export type Comment = z.infer<typeof commentSchema>;
export type CommentsArr = z.infer<typeof CommentArraySchema>;
