import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import { logout } from '../(auth)/_lib/actions';
import { getProfileData } from './actions';

export default async function ProfilePage() {
  const profileData = await getProfileData();

  return (
    <Box component='main'>
      <Paper sx={{ p: 4, mt: 8, mx: 'auto', maxWidth: 500 }}>
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
          <form action={logout}>
            <Button type='submit'>LOGOUT</Button>
          </form>
          <Button href='/' sx={{ ml: 2 }}>
            Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
