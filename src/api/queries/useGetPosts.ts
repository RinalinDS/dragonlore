import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { instance } from '../config';
import { queryKeys } from '../queryKeys';
import { PostArr, PostsArraySchema } from '../schemas/posts';

type Request = {
  page: number;
  itemsPerPage: number;
};

const getPosts = async ({ page, itemsPerPage }: Request): Promise<PostArr> => {
  const response = await instance.get(
    `posts?_start=${page}&_limit=${itemsPerPage}`
  );

  const result = PostsArraySchema.safeParse(response.data);

  if (!result.success) {
    toast.error('Get Posts request has wrong types');
  } else {
    toast.success(
      `${itemsPerPage} new posts from page ${page + 1} loaded successfully`
    );
  }

  return response.data;
};

export const useGetPosts = ({ page = 0, itemsPerPage = 10 }: Request) => {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKeys.posts, page, itemsPerPage],
    queryFn: () => getPosts({ itemsPerPage, page }),
  });

  return { data, isFetching, isLoading };
};
