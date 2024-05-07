import {
  createDiscussionHandler,
  deleteDiscussionByIdHandler as deleteDiscussionHandler,
  getAllDiscussionsHandler,
  getDiscussionConferenceToken,
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
 *   schemas:
 *     Discussion:
 *       type: object
 *       required: [_id, organizer, title, startTime, durationInMinutes]
 *       properties:
 *         _id:
 *           type: string
 *         organizer:
 *           type: object
 *           required: [_id, username, email]
 *           properties:
 *             _id:
 *               type: string
 *             username:
 *               type: string
 *             email:
 *               type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         startTime:
 *           type: string
 *           format: date-time
 *         durationInMinutes:
 *           type: number
 */

/**
 * @openapi
 * /discussions/{id}:
 *   get:
 *     summary: Get a discussion by id
 *     tags: [discussions]
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
 *               $ref: '#/components/schemas/Discussion'
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
 *     tags: [discussions]
 *     responses:
 *       200:
 *         description: The list of discussions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discussion'
 *       500:
 *         description: Internal server error
 */
discussionRouter.get('/discussions', getAllDiscussionsHandler);

/**
 * @openapi
 * components:
 *   requestBodies:
 *     createDiscussion:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, startTime, durationInMinutes]
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
 */

/**
 * @openapi
 * /discussions:
 *   post:
 *     summary: Create a new discussion
 *     tags: [discussions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/createDiscussion'
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
 *     tags: [discussions]
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

/**
 * @openapi
 * /discussions/{id}/conference-token:
 *   get:
 *     summary: Get a conference token for a discussion
 *     tags: [discussions]
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
 *         description: The conference token
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'conferenceToken'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
discussionRouter.get(
  '/discussions/:id/conference-token',
  securityMiddleware,
  getDiscussionConferenceToken,
);
