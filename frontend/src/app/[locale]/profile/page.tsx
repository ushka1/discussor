import { Box, Toolbar } from '@mui/material';
import bg from '@public/background.jpg';
import ProfileCard from './profileCard';
import ProfileDrawer from './profileDrawer';

const drawerWidth = 240;
const appBarZIndex = 1100;

export default async function ProfilePage() {
  return (
    <Box
      component='main'
      sx={{
        minHeight: '100dvh',
        backgroundImage: `url(${bg.src})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <ProfileDrawer appBarZIndex={appBarZIndex} drawerWidth={drawerWidth} />
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
        <ProfileCard />
      </Box>
    </Box>
  );
}
