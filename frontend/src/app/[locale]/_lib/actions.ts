'use server';

import { axios } from '@discussor/axios';

export async function getPostsData() {
  const { data } = await axios.get('/posts');
  return data;
}
