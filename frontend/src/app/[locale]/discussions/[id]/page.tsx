import { Box, Toolbar } from '@mui/material';
import { getDiscussionConferenceToken } from './actions';
import Conference from './conference';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Readonly<Props>) {
  // const discussion = await getDiscussion(params.id);
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
      <Box
        sx={{
          p: 4,
          flexGrow: 1,
          minHeight: 0,
        }}
      >
        <Conference conferenceToken={conferenceToken} />
      </Box>
    </Box>
  );
}
