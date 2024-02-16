import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CommentsArr } from './api/schemas/posts';
import {
  ErrorComponent,
  ErrorComponentProps,
  Router,
  createRoute,
  useNavigate,
} from '@tanstack/react-router';
import { rootRoute } from './App';

const fetchComments = async (postId: string) => {
  const post = await axios
    .get<CommentsArr>(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    )
    .then((r) => r.data);

  return post;
};

const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['posts', { postId }],
    queryFn: () => fetchComments(postId),
  });

const PostRouteComponent = () => {
  const { postId } = postRoute.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));
  const comments = postQuery.data;

  const navigate = useNavigate({ from: '/$postId' });

  return (
    <div style={{ fontSize: '30px' }}>
      <button onClick={() => navigate({ to: '/' })}>goback</button>
      {comments?.map((comment) => {
        return (
          <div key={comment.id}>
            <div>comment from {comment.email}</div>
            <h2>{comment.name}</h2>
            <p>{comment.body}</p>
          </div>
        );
      })}
    </div>
  );
};

class NotFoundError extends Error {}

export const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$postId',
  errorComponent: PostErrorComponent,
  loader: ({ context: { queryClient }, params: { postId } }) =>
    queryClient.ensureQueryData(postQueryOptions(postId)),
  component: PostRouteComponent,
});

function PostErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof NotFoundError) {
    return <div>{error.message}</div>;
  }

  return <ErrorComponent error={error} />;
}
