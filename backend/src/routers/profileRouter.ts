import { profileHandler } from '@/controllers/profileController';
import { securityMiddleware } from '@/security/securityMiddleware';
import { Router } from 'express';

export const profileRouter = Router();

/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Get the user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
profileRouter.get('/profile', securityMiddleware, profileHandler);
