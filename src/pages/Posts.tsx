import { Box, Pagination, Stack } from '@mui/material';
import { createRoute } from '@tanstack/react-router';
import { ChangeEvent, useState } from 'react';
import { rootRoute } from '../App';
import { useGetPosts } from '../api/queries/useGetPosts';
import { PageLoader } from '../components/PageLoader';
import { Post } from '../components/Post';

const DEFAULT_PER_PAGE = 10;

const Posts = () => {
  const [page, setPage] = useState(1);

  const handleChange = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const { data, isFetching, isLoading } = useGetPosts({
    itemsPerPage: DEFAULT_PER_PAGE,
    page: page - 1,
  });

  return (
    <Stack padding={2} gap={1} sx={{ bgcolor: '#cfe8fc', minHeight: '100vh' }}>
      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        data.map(({ body, id, title }) => {
          return <Post key={id} id={id} body={body} title={title} />;
        })
      )}
      <Box marginTop={2} alignSelf={'center'}>
        <Pagination
          size="large"
          count={10}
          page={page}
          onChange={handleChange}
          sx={{ fontSize: '2rem!important' }}
        />
      </Box>
    </Stack>
  );
};

export const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Posts,
});
