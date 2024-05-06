import { Box, Button, Grid, Paper, Toolbar, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { getDiscussions } from './_lib/actions';

export default async function HomePage() {
  const t = await getTranslations('Home');
  const discussions = await getDiscussions();

  return (
    <Box component='main'>
      <Toolbar />
      <Box>
        <Typography variant='h4' sx={{ my: 4, textAlign: 'center' }}>
          Available discussions
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={4} sx={{ maxWidth: 1000 }}>
          {discussions.map((dsc) => (
            <Grid key={dsc._id} item xs={4}>
              <Paper
                variant='outlined'
                sx={{
                  py: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h6'>{dsc.title}</Typography>
                <Typography variant='body2'>{dsc.description}</Typography>
                <Button
                  href={`/discussions/${dsc._id}`}
                  variant='contained'
                  color='success'
                  disableElevation
                  sx={{ mt: 2, px: 4 }}
                >
                  Join
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
