import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { instance } from '../config';
import { queryKeys } from '../queryKeys';
import { CommentArraySchema, CommentsArr } from '../schemas/posts';

export const getComments = async (postId: string): Promise<CommentsArr> => {
  const response = await instance.get(`posts/${postId}/comments`);

  const result = CommentArraySchema.safeParse(response.data);

  if (!result.success) {
    toast('Get comments request has wrong types');
  } else {
    toast('Get comments request is fine');
  }

  return response.data;
};

export const useGetComments = (postId: string) => {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKeys.comments, postId],
    queryFn: () => getComments(postId),
    enabled: postId !== undefined,
  });

  return { comments: data, isFetching, isLoading };
};
