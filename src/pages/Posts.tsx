import { Box, Pagination, Stack, Typography } from '@mui/material';
import { Link, createRoute } from '@tanstack/react-router';
import { rootRoute } from '../App';
import { PageLoader } from '../components/PageLoader';
import { postRoute } from './Comments';
import { useGetPosts } from '../api/queries/useGetPosts';
import { ChangeEvent, useState } from 'react';

const DEFAULT_PER_PAGE = 10;

const Posts = () => {
  const [page, setPage] = useState(1);

  const handleChange = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  console.log(page);

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
                  to={postRoute.to}
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

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Posts,
});
