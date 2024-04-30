import express from 'express';
import { setupGracefulShutdown } from './config/gracefulShutdown';
import { logger } from './config/logger';
import { connectToMongoDB } from './config/mongodb';
import { setupSwagger } from './config/swagger';
import { authRouter } from './routers/authRouter';

const app = express();
const port = process.env.PORT;

setupSwagger(app);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Check if the server is up
 *     responses:
 *       200:
 *         description: The server is up
 */
app.get('/', (_, res) => {
  res.send('The server is up!');
});

app.use(authRouter);

(async () => {
  await connectToMongoDB();
  logger.info('Connected to MongoDB');

  const server = app.listen(port);
  logger.info(`Server running on http://localhost:${port}`);

  setupGracefulShutdown(server);
  logger.info('Graceful shutdown setup');
})();
