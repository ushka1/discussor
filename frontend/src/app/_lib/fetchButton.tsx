'use client';

import { Button } from '@mui/material';
import { getPostsData } from './actions';

export default function FetchButton() {
  async function handler() {
    const data = await getPostsData();
    console.log(data);
  }

  return <Button onClick={handler}>Fetch posts</Button>;
}
