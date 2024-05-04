'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

export const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = cookies().get('session')?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log('Axios interceptor error.');
    return Promise.reject(error);
  },
);
