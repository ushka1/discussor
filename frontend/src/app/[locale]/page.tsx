import {
  Box,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { getDiscussions } from './_lib/actions';

export default async function HomePage() {
  const t = await getTranslations('Home');
  const discussions = await getDiscussions();

  return (
    <Box component='main'>
      <Toolbar />
      <Box>
        <Typography variant='h2' sx={{ mt: 8, textAlign: 'center' }}>
          {t('title')}
        </Typography>
      </Box>
      <List>
        {discussions.map((dsc: any) => (
          <ListItem key={dsc.title}>
            <ListItemText>{dsc.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
