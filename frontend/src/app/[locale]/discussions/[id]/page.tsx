import { Box, Toolbar } from '@mui/material';
import { getDiscussion, getDiscussionConferenceToken } from './actions';
import Conference from './conference';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Readonly<Props>) {
  const discussion = await getDiscussion(params.id);
  const conferenceToken = await getDiscussionConferenceToken(params.id);

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
      }}
    >
      <Toolbar />
      {/* <Typography variant='h4' sx={{ mt: 4, textAlign: 'center' }}>
        {discussion.title}
      </Typography>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        {discussion.description}
      </Typography> */}
      <Box sx={{ p: 4, height: '100%' }}>
        <Conference conferenceToken={conferenceToken} />
      </Box>
    </Box>
  );
}
