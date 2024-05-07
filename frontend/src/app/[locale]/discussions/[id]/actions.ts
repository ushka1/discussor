import { apiClient } from '@/api/axios';
import { paths } from '@/api/openapi';

type DiscussionData =
  paths['/discussions/{id}']['get']['responses']['200']['content']['application/json'];

export async function getDiscussion(discussionId: string) {
  const response = await apiClient.get<DiscussionData>(
    `/discussions/${discussionId}`,
  );
  return response.data;
}

export async function getDiscussionConferenceToken(discussionId: string) {
  const response = await apiClient.get<string>(
    `/discussions/${discussionId}/conference-token`,
  );
  return response.data;
}
