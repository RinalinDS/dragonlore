import { Box, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { commentsRoute } from '../pages/Comments';

type Props = {
  title: string;
  body: string;
  id: number;
};

export const Post = ({ body, title, id }: Props) => {
  return (
    <Box>
      <Typography variant="h2" fontSize={'2.4rem'}>
        <Link
          to={commentsRoute.to}
          params={{
            postId: id.toString(),
          }}
        >
          {title}
        </Link>
      </Typography>
      <Typography variant="body1" fontSize={'1.6rem'}>
        {body}
      </Typography>
    </Box>
  );
};
