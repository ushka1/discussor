import { loginHandler, registerHandler } from '@/controllers/authController';
import { loginSchema, registerSchema } from '@/validation/authValidation';
import { validationMiddleware } from '@/validation/validationMiddleware';
import { Router } from 'express';

export const authRouter = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password, repeatPassword]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               repeatPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: New user registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'generatedAccssToken'
 *       400:
 *         description: Invalid request body
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
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'generatedAccssToken'
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
