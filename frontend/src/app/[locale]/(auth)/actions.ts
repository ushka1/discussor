'use server';

import { axios } from '@discussor/axios';
import { redirect } from '@discussor/navigation';
import { LoginFormSchema, RegisterFormSchema } from './definitions';
import { createSession } from './session';

export async function login(state: unknown, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await axios.post('/auth/login', validatedFields.data);
  const token = response.data?.token;

  if (token) {
    createSession(token);
    // @ts-ignore
    redirect('/profile');
  }
}

export async function register(state: unknown, formData: FormData) {
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

  const response = await axios.post('/auth/register', validatedFields.data);
  const token = response.data?.token;

  if (token) {
    createSession(token);
  }
}
