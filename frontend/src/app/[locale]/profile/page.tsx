import { Box, Button, Link, Typography } from '@mui/material';
import { logout } from '../(auth)/_lib/actions';

export default function ProfilePage() {
  return (
    <Box>
      <Typography>Profile</Typography>
      <Link href='/'>Home</Link>
      <form action={logout}>
        <Button type='submit'>LOGOUT</Button>
      </form>
    </Box>
  );
}
