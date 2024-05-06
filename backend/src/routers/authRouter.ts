import { loginHandler, registerHandler } from '@/controllers/authController';
import { loginSchema, registerSchema } from '@/validation/authValidation';
import { validationMiddleware } from '@/validation/middleware';
import { Router } from 'express';

export const authRouter = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               repeatPassword:
 *                 type: string
 *             required: [username, email, password, repeatPassword]
 *     responses:
 *       200:
 *         description: New user registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid username, email, or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */
authRouter.post(
  '/auth/register',
  validationMiddleware(registerSchema),
  registerHandler,
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required: [email, password]
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
authRouter.post(
  '/auth/login', //
  validationMiddleware(loginSchema),
  loginHandler,
);
