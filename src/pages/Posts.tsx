import { Box, Pagination, Stack, Typography } from '@mui/material';
import { Link, createRoute } from '@tanstack/react-router';
import { ChangeEvent, useState } from 'react';
import { rootRoute } from '../App';
import { useGetPosts } from '../api/queries/useGetPosts';
import { PageLoader } from '../components/PageLoader';
import { commentsRoute } from './Comments';

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
        data.map((post) => {
          return (
            <Box key={post.id}>
              <Typography variant="h2" fontSize={'2.4rem'}>
                <Link
                  to={commentsRoute.to}
                  params={{
                    postId: post.id.toString(),
                  }}
                >
                  {post.title}
                </Link>
              </Typography>
              <Typography variant="body1" fontSize={'1.6rem'}>
                {post.body}
              </Typography>
            </Box>
          );
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
