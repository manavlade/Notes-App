import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import sql from './config/postgres.js';

const app = express();
const PORT = 5000;

app.use(express.json());
dotenv.config();

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend server is running smoothly' });
});

try {

  await sql`SELECT 1`;

  console.log("✅ Database connected successfully");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

} catch (error) {
  console.log(error);
}
