import {
  createDiscussionHandler,
  deleteDiscussionByIdHandler as deleteDiscussionHandler,
  getAllDiscussionsHandler,
  getDiscussionByIdHandler as getDiscussionHandler,
} from '@/controllers/discussionController';
import { securityMiddleware } from '@/security/securityMiddleware';
import { createDiscussionSchema } from '@/validation/discussionValidation';
import { validationMiddleware } from '@/validation/validationMiddleware';
import { Router } from 'express';

export const discussionRouter = Router();

/**
 * @openapi
 * components:
 *   discussion:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       organizer:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *           username:
 *             type: string
 *           email:
 *             type: string
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *       startTime:
 *         type: string
 *         format: date-time
 *       durationInMinutes:
 *         type: number
 */

/**
 * @openapi
 * /discussions/{id}:
 *   get:
 *     summary: Get a discussion by id
 *     tags:
 *       - discussions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The discussion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/discussion'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Internal server error
 */
discussionRouter.get('/discussions/:id', getDiscussionHandler);

/**
 * @openapi
 * /discussions:
 *   get:
 *     summary: Get all discussions
 *     tags:
 *       - discussions
 *     responses:
 *       200:
 *         description: The list of discussions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/discussion'
 *       500:
 *         description: Internal server error
 */
discussionRouter.get('/discussions', getAllDiscussionsHandler);

/**
 * @openapi
 * components:
 *   createDiscussionBody:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *       startTime:
 *         type: string
 *         format: date-time
 *       durationInMinutes:
 *         type: number
 *     required: [title, startTime, durationInMinutes]
 */

/**
 * @openapi
 * /discussions:
 *   post:
 *     summary: Create a new discussion
 *     tags:
 *       - discussions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/createDiscussionBody'
 *     responses:
 *       200:
 *         description: New discussion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'discussionId'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
discussionRouter.post(
  '/discussions',
  securityMiddleware,
  validationMiddleware(createDiscussionSchema),
  createDiscussionHandler,
);

/**
 * @openapi
 * /discussions/{id}:
 *   delete:
 *     summary: Delete a discussion by id
 *     tags:
 *       - discussions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discussion deleted successfully
 *       400:
 *         description: Invalid ID format
 *       403:
 *         description: User is not the organizer
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Internal server error
 */
discussionRouter.delete(
  '/discussions/:id',
  securityMiddleware,
  deleteDiscussionHandler,
);
