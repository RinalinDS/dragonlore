import { useQuery } from '@tanstack/react-query';
import { instance } from '../config';
import { queryKeys } from '../queryKeys';
import { toast } from 'react-toastify';

type Request = {
  page?: number;
  itemsPerPage?: number;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const getPosts = async ({ page, itemsPerPage }: Request): Promise<Post[]> => {
  const response = await instance.get(
    `posts?_start=${page}&_limit=${itemsPerPage}`
  );
  toast(`${itemsPerPage} new posts were loaded`);
  return response.data;
};

export const useGetPosts = ({ page = 0, itemsPerPage = 10 }: Request) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKeys.posts, page, itemsPerPage],
    queryFn: () => getPosts({ itemsPerPage, page }),
  });

  return { data, isFetching, isLoading };
};
