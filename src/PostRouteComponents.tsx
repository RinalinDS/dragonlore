import { createRoute, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './App';
import { useGetComments } from './api/queries/useGetComments';

const PostRouteComponent = () => {
  const { postId } = postRoute.useParams();

  const { comments, isFetching, isLoading } = useGetComments(postId);

  const navigate = useNavigate({ from: '/$postId' });

  if (isFetching || isLoading) {
    return <div>....Comments loading</div>;
  }

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

export const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$postId',
  component: PostRouteComponent,
});
