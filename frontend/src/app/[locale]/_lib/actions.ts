'use server';

import { apiClient } from '@/api/axios';

type DiscussionsData = {
  _id: 'string';
  organizer: {
    _id: 'string';
    username: 'string';
    email: 'string';
  };
  title: 'string';
  description: 'string';
  tags: ['string'];
  startTime: '2024-05-06T18:45:35.497Z';
  durationInMinutes: 0;
}[];

export async function getDiscussions() {
  const response = await apiClient.get<DiscussionsData>('/discussions');
  return response.data;
}
