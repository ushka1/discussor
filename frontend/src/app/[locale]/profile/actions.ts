'use server';

import { apiClient } from '@/api/axios';
import { paths } from '@/api/openapi';

type ProfileData =
  paths['/profile']['get']['responses']['200']['content']['application/json'];

export async function getProfileData() {
  const response = await apiClient.get<ProfileData>('/profile');
  return response.data;
}
