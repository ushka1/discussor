import { z } from 'zod';

export const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long.' })
      .max(30, { message: 'Name must be at most 30 characters long.' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowerecase letter.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/\d/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      })
      .trim(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords must match.',
    path: ['repeatPassword'],
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().trim(),
});
