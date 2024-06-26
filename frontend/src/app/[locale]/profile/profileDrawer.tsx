import {
  Message,
  Person,
  Settings as SettingsIcon,
  VideoChat,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

type Props = {
  drawerWidth: number;
  appBarZIndex: number;
};

export default function ProfileDrawer({
  appBarZIndex,
  drawerWidth,
}: Readonly<Props>) {
  return (
    <Drawer
      open
      variant='permanent'
      sx={{
        '& .MuiDrawer-paper': {
          display: { xs: 'none', md: 'flex' },
          height: '100%',
          width: drawerWidth,
          zIndex: appBarZIndex - 1,
          background: 'transparent',
          borderRight: 'none',
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <VideoChat />
              </ListItemIcon>
              <ListItemText primary={'Discussions'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Message />
              </ListItemIcon>
              <ListItemText primary={'Messages'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
