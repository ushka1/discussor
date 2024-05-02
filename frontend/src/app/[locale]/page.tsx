import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { getPostsData, getServerStatus } from './_lib/actions';
import LocaleSwitcher from './_lib/localeSwitcher';

export default async function HomePage() {
  const t = await getTranslations('Home');
  const posts = await getPostsData();
  const status = await getServerStatus();

  return (
    <main>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h2' sx={{ mr: 4 }}>
          {t('title')}
        </Typography>
        <Typography variant='h6' sx={{ mr: 4 }}>
          {status}
        </Typography>
        <LocaleSwitcher />
      </Box>
      <List>
        {posts.map((post: any) => (
          <ListItem key={post.title}>
            <ListItemText>{post.title}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Box>
        <Link href='/profile'>Profile</Link>
      </Box>
    </main>
  );
}
