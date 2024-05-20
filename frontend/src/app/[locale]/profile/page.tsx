import { Person } from '@mui/icons-material';
import { Avatar, Box, Button, Paper, Toolbar, Typography } from '@mui/material';
import bg from '@public/background.jpg';
import { logout } from '../(auth)/_lib/actions';
import { getProfileData } from './actions';
import ProfileDrawer from './profileDrawer';

const drawerWidth = 240;
const appBarZIndex = 1100;

export default async function ProfilePage() {
  const profileData = await getProfileData();

  return (
    <Box
      component='main'
      sx={{
        minHeight: '100dvh',
        backgroundImage: `url(${bg.src})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        zIndex: appBarZIndex - 1,
      }}
    >
      <ProfileDrawer />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            md: `${drawerWidth}px`,
          },
        }}
      >
        <Toolbar />
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
      </Box>
    </Box>
  );
}
