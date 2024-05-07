import { Router } from 'express';

export const serverStatusRouter = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Check if the server is up
 *     tags: [server status]
 *     responses:
 *       200:
 *         description: The server is up
 */
serverStatusRouter.get('/', (req, res) => {
  res.send('The server is up!');
});
