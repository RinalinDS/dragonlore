import { Button, Stack } from '@mui/material';
import { createRoute, useNavigate } from '@tanstack/react-router';
import { rootRoute } from '../App';
import { useGetComments } from '../api/queries/useGetComments';
import { PageLoader } from '../components/PageLoader';
import { Comment } from '../components/Comment';

const Comments = () => {
  const { postId } = commentsRoute.useParams();

  const { comments, isFetching, isLoading } = useGetComments(postId);

  const navigate = useNavigate({ from: '/$postId' });

  if (isFetching || isLoading) {
    return <PageLoader />;
  }

  return (
    <Stack padding={2} gap={1} sx={{ bgcolor: '#cfe8fc', minHeight: '100vh' }}>
      {comments.map(({ body, email, id, name }) => {
        return <Comment key={id} body={body} email={email} name={name} />;
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

export const commentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$postId',
  component: Comments,
});
