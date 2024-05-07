import { verifySession } from '@/security/sessions';
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { getDiscussions } from './_lib/actions';

export default async function HomePage() {
  const t = await getTranslations('Home');
  const isAuth = verifySession();
  const discussions = await getDiscussions();

  return (
    <Box component='main'>
      <Toolbar />
      <Box>
        <Typography variant='h4' sx={{ mt: 4, textAlign: 'center' }}>
          {t('availableDiscussions')}
        </Typography>
      </Box>
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', my: 4 }}
      >
        <Grid container spacing={4} sx={{ maxWidth: 1000 }}>
          {discussions.map((dsc) => (
            <Grid key={dsc._id} item xs={4}>
              <Paper
                variant='outlined'
                sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'justify',
                }}
              >
                <Typography variant='h6'>{dsc.title}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    rowGap: 1,
                    mt: 2,
                  }}
                >
                  {dsc.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      variant='outlined'
                      color='primary'
                      sx={{ mr: 1 }}
                      size='small'
                    />
                  ))}
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    mt: 2,
                  }}
                >
                  {dsc.description}
                </Typography>
                <Button
                  href={`/discussions/${dsc._id}`}
                  variant='contained'
                  color='success'
                  disableElevation
                  disabled={!isAuth}
                  sx={{ mt: 2, px: 6 }}
                >
                  {t('join')}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
