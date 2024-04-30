import express from 'express';
import { setupGracefulShutdown } from './config/gracefulShutdown';
import { logger } from './config/logger';
import { setupSwagger } from './config/swagger';

const app = express();
const port = process.env.PORT;

setupSwagger(app);

/**
 * @openapi
 * '/':
 *   get:
 *     summary: A simple GET request
 *     responses:
 *       200:
 *        description: OK
 */
app.get('/', (_, res) => {
  logger.info('GET /');
  res.send('Hello, TypeScript with Express!');
});

/**
 * @openapi
 * '/posts':
 *   get:
 *     summary: A simple GET request to fetch posts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   body:
 *                     type: string
 */
app.get('/posts', (_, res) => {
  logger.info('GET /posts');
  res.json([
    { title: 'Post 1', body: 'This is post 1' },
    { title: 'Post 2', body: 'This is post 2' },
    { title: 'Post 3', body: 'This is post 3' },
  ]);
});

const server = app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

setupGracefulShutdown(server);
