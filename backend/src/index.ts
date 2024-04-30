import express from 'express';
import { logger } from './config/logger';

const app = express();
const port = process.env.PORT;

app.get('/', (_, res) => {
  logger.info('GET /');
  res.send('Hello, TypeScript with Express!');
});

app.get('/posts', (_, res) => {
  logger.info('GET /posts');
  res.json([
    { title: 'Post 1', body: 'This is post 1' },
    { title: 'Post 2', body: 'This is post 2' },
    { title: 'Post 3', body: 'This is post 3' },
  ]);
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
