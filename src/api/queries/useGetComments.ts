import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { instance } from '../config';
import { queryKeys } from '../queryKeys';
import { CommentArraySchema, CommentsArr } from '../schemas/posts';
import { ZodError } from 'zod';

export const getComments = async (postId: string): Promise<CommentsArr> => {
  try {
    const response = await instance.get(`posts/${postId}/comments`);

    const result = CommentArraySchema.parse(response.data);

    return result;
  } catch (e) {
    if (e instanceof ZodError) {
      const uniqueMistakes = Array.from(
        new Set(
          e.issues.map((issue) => `${issue.message} in ${issue.path[1]} param`)
        )
      );

      if (uniqueMistakes.length > 1) {
        uniqueMistakes.forEach((errorMessage) => {
          toast.error(`Validation error: ${errorMessage}`);
        });
      } else {
        const firstError = e.issues[0];
        toast.error(
          `Validation error: ${firstError.message} in ${firstError.path[1]} param`
        );
      }
    }
    return [];
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
