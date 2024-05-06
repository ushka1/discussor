'use server';

import { apiClient } from '@/api/axios';

export async function getServerStatus() {
  const { data } = await apiClient.get('/');
  return data;
}

export async function getPostsData() {
  const { data } = await apiClient.get('/posts');
  return data;
}
