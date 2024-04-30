import { HttpResponse, http } from 'msw';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/posts`, () => {
    return HttpResponse.json([
      { title: 'Post 1', body: 'This is post 1' },
      { title: 'Post 2', body: 'This is post 2' },
      { title: 'Post 3', body: 'This is post 3' },
    ]);
  }),
];
