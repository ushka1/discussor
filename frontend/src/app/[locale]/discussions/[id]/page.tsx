import { Box, Toolbar, Typography } from '@mui/material';
import { getDiscussion } from './actions';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Readonly<Props>) {
  const discussion = await getDiscussion(params.id);

  return (
    <Box component='main'>
      <Toolbar />
      <Typography variant='h4' sx={{ mt: 4, textAlign: 'center' }}>
        {discussion.title}
      </Typography>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        {discussion.description}
      </Typography>
    </Box>
  );
}
