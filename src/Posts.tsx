import { Link, createRoute } from '@tanstack/react-router';
import { useGetPosts } from './api/queries/useGetPosts';
import { rootRoute } from './App';
import { postRoute } from './PostRouteComponents';

const Posts = () => {
  const { data, isFetching, isLoading } = useGetPosts({});

  return (
    <div>
      {isLoading || isFetching ? (
        <div>...Posts Loading</div>
      ) : (
        data.map((post) => {
          return (
            <div key={post.id}>
              <h2>
                <Link
                  to={postRoute.to}
                  params={{
                    postId: post.id.toString(),
                  }}
                >
                  {post.title}
                </Link>
              </h2>
              <p>{post.body}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Posts,
});
