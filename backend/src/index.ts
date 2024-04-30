import express from 'express';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/posts', (req, res) => {
  res.json([
    { title: 'Post 1', body: 'This is post 1' },
    { title: 'Post 2', body: 'This is post 2' },
    { title: 'Post 3', body: 'This is post 3' },
  ]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
