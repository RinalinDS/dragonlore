import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { createRoute, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './App';
import { useGetComments } from './api/queries/useGetComments';
import { PageLoader } from './PageLoader';

const PostRouteComponent = () => {
  const { postId } = postRoute.useParams();

  const { comments, isFetching, isLoading } = useGetComments(postId);

  const navigate = useNavigate({ from: '/$postId' });

  if (isFetching || isLoading) {
    return <PageLoader />;
  }

  return (
    <Stack padding={2} gap={1} sx={{ bgcolor: '#cfe8fc', minHeight: '100vh' }}>
      {comments.map((comment) => {
        return (
          <Container key={comment.id}>
            <Box>
              <Typography variant="overline">
                comment from {comment.email}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3">{comment.name}</Typography>
              <Typography variant="body2">{comment.body}</Typography>
            </Box>
          </Container>
        );
      })}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate({ to: '/' })}
        style={{ alignSelf: 'center' }}
      >
        go back
      </Button>
    </Stack>
  );
};

export const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$postId',
  component: PostRouteComponent,
});
