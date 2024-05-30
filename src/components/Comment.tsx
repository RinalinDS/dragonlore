import { Box, Container, Typography } from '@mui/material';

type Props = {
  email: string;
  name: string;
  body: string;
};

export const Comment = ({ body, email, name }: Props) => {
  return (
    <Container>
      <Box>
        <Typography variant="overline">comment from {email}</Typography>
      </Box>
      <Box>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="body2">{body}</Typography>
      </Box>
    </Container>
  );
};
