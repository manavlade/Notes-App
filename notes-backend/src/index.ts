import express, { Request, Response } from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend server is running smoothly' });
});

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
