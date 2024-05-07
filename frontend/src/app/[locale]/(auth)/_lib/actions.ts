'use server';

import { apiClient } from '@/api/axios';
import { createSession, deleteSession } from '@/security/sessions';
import { redirect } from '@discussor/navigation';
import { LoginFormSchema, RegisterFormSchema } from './definitions';

export async function login(previousState: unknown, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await apiClient.post('/auth/login', validatedFields.data);
    const token = response.data;
    createSession(token);
  } catch (err) {
    console.log(err);
    return {
      errors: {
        email: 'Invalid credentials.',
        password: 'Invalid credentials.',
      },
    };
  }

  // @ts-ignore
  redirect('/profile');
}

export async function register(previousState: unknown, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await apiClient.post('/auth/register', validatedFields.data);
  const token = response.data;

  if (token) {
    createSession(token);
  }
}

export async function logout() {
  deleteSession();
  // @ts-ignore
  redirect('/login');
}
