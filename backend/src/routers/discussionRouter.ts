import {
  createDiscussionHandler,
  getAllDiscussionsHandler,
  getDiscussionByIdHandler,
} from '@/controllers/discussionController';
import { authMiddleware } from '@/security/middleware';
import { createDiscussionSchema } from '@/validation/discussionValidation';
import { validationMiddleware } from '@/validation/middleware';
import { Router } from 'express';

export const discussionRouter = Router();

discussionRouter.get('/discussions/:id', getDiscussionByIdHandler);
discussionRouter.get('/discussions', getAllDiscussionsHandler);

/**
 * @openapi
 * /discussions/create:
 *   post:
 *     summary: Create a new discussion
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               durationInMinutes:
 *                 type: number
 *             required: [title, startTime, durationInMinutes]
 *     responses:
 *       200:
 *         description: New discussion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 discussionId:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
discussionRouter.post(
  '/discussions/create',
  authMiddleware,
  validationMiddleware(createDiscussionSchema),
  createDiscussionHandler,
);
