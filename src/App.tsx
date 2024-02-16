import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: App,
});
