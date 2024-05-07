import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import bg from '@public/background.jpg';
import { logout } from '../(auth)/_lib/actions';
import { getProfileData } from './actions';

export default async function ProfilePage() {
  const profileData = await getProfileData();

  return (
    <Box
      component='main'
      sx={{
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 500,
          px: 6,
          py: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar>{profileData.username[0]}</Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography>Username: {profileData.username}</Typography>
            <Typography>Email: {profileData.email}</Typography>
          </Box>
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
    </Box>
  );
}
