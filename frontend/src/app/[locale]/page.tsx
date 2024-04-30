import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { getPostsData } from './_lib/actions';
import FetchButton from './_lib/fetchButton';
import LocaleSwitcher from './_lib/localeSwitcher';

export default async function Home() {
  const t = await getTranslations('Index');
  const data = await getPostsData();

  return (
    <main>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h2' sx={{ mr: 4 }}>
          {t('title')}
        </Typography>
        <LocaleSwitcher />
      </Box>
      <List>
        {data.map((post: any) => (
          <ListItem key={post.title}>
            <ListItemText>{post.title}</ListItemText>
          </ListItem>
        ))}
      </List>
      <FetchButton />
    </main>
  );
}
