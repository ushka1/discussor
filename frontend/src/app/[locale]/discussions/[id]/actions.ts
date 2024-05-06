import { apiClient } from '@/api/axios';

type DiscussionData = {
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
};

export async function getDiscussion(discussionId: string) {
  const response = await apiClient.get<DiscussionData>(
    `/discussions/${discussionId}`,
  );
  return response.data;
}
