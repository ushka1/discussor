'use server';

export async function getPostsData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
  const data = await response.json();

  return data;
}
