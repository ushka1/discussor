'use server';

import { apiClient } from '@/api/axios';
import { paths } from '@/api/openapi';

type DiscussionsData =
  paths['/discussions']['get']['responses']['200']['content']['application/json'];

export async function getDiscussions() {
  const response = await apiClient.get<DiscussionsData>('/discussions');
  return response.data;
}
