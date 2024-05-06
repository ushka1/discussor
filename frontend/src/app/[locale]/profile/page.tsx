import { Avatar, Box, Button, Paper, Toolbar, Typography } from '@mui/material';
import { logout } from '../(auth)/_lib/actions';
import { getProfileData } from './actions';

export default async function ProfilePage() {
  const profileData = await getProfileData();

  return (
    <Box component='main'>
      <Toolbar />
      <Paper
        sx={{ py: 4, mt: 8, mx: 'auto', maxWidth: 500 }}
        variant='outlined'
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
