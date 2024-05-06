'use server';

import { apiClient } from '@/api/axios';

type ProfileData = {
  username: string;
  email: string;
};

export async function getProfileData() {
  const response = await apiClient.get<ProfileData>('/profile');
  return response.data;
}
