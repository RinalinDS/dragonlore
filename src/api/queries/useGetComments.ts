import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ZodErrorHandler } from '../../utils/ZodErrorHandler';
import { instance } from '../config';
import { queryKeys } from '../queryKeys';
import { CommentArraySchema, CommentsArr } from '../schemas/posts';

export const getComments = async (postId: string): Promise<CommentsArr> => {
  try {
    const response = await instance.get(`posts/${postId}/comments`);

    const result = CommentArraySchema.parse(response.data);

    toast.success(`Comments for post with id ${postId} loaded successfully`);

    return result;
  } catch (e) {
    return ZodErrorHandler(e as unknown as Error);
  }

  // if (!result.success) {
  //   toast.error('Get comments request has wrong types');
  // } else {
  //   toast.success('Get comments request is fine');
  // }
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
