import { List, ListItem, Typography } from '@mui/material';
import { getPostsData } from './_lib/actions';
import FetchButton from './_lib/fetchButton';

export default async function Home() {
  const data = await getPostsData();
  console.log(data);

  return (
    <main>
      <Typography variant='h2'>Hello!</Typography>
      <List>
        {data.map((post: any) => (
          <ListItem key={post.title}>{post.title}</ListItem>
        ))}
      </List>
      <FetchButton />
    </main>
  );
}
