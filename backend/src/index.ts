import express from 'express';
import { setupGracefulShutdown } from './config/gracefulShutdown';
import { logger } from './config/logger';
import { connectToMongoDB } from './config/mongodb';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './controllers/errorController';
import { authRouter } from './routers/authRouter';
import { conferenceRouter } from './routers/conferenceRouter';
import { discussionRouter } from './routers/discussionRouter';
import { profileRouter } from './routers/profileRouter';
import { serverStatusRouter } from './routers/serverStatusRouter';

const app = express();
const port = process.env.PORT;

app.use(express.json());

setupSwagger(app);

app.use(serverStatusRouter);
app.use(authRouter);
app.use(profileRouter);
app.use(discussionRouter);
app.use(conferenceRouter);

app.use(errorHandler);

(async () => {
  await connectToMongoDB();
  logger.info('Connected to MongoDB.');

  const server = app.listen(port);
  logger.info(`Server running on http://localhost:${port}.`);

  setupGracefulShutdown(server);
  logger.info('Graceful shutdown setup.');
})();
