import originalAxios from 'axios';

export const axios = originalAxios.create({
  baseURL: process.env.API_BASE_URL,
});
