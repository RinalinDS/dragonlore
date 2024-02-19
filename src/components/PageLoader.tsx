import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export const PageLoader = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <CircularProgress />
    </Stack>
  );
};
