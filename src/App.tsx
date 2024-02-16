import { useGetPosts } from './api/queries/useGetPosts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const { data = [], isFetching, isLoading } = useGetPosts({});

  return (
    <div>
      {isLoading || isFetching ? (
        <div>...Posts Loading</div>
      ) : (
        data.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          );
        })
      )}
      <ToastContainer />
    </div>
  );
};
