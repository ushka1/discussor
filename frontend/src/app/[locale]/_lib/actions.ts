'use server';

import { apiClient } from '@/api/axios';

export async function getDiscussions() {
  const response = await apiClient.get('/discussions');
  return response.data;
}
