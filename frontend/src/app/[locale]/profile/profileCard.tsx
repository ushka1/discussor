import { Person } from '@mui/icons-material';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import { logout } from '../(auth)/_lib/actions';
import { getProfileData } from './actions';

export default async function ProfileCard() {
  const profileData = await getProfileData();

  return (
    <Paper
      elevation={4}
      sx={{
        px: 6,
        py: 4,
        mt: 16,
        width: 500,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar sx={{ width: 80, height: 80 }}>
          <Person
            sx={{
              width: '75%',
              height: '75%',
            }}
          />
        </Avatar>
        <Typography variant='h5' sx={{ mt: 2 }}>
          {profileData.username}
        </Typography>
        <Typography>{profileData.email}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Button href='/' sx={{ mr: 2 }}>
          Home
        </Button>
        <form action={logout}>
          <Button type='submit'>LOGOUT</Button>
        </form>
      </Box>
    </Paper>
  );
}
