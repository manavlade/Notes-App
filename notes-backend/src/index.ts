import express from 'express';
import dotenv from 'dotenv';
import sql from './config/postgres.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';

import prisma from './config/prisma.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);

app.use("/api/notes", notesRoutes);

const startServer = async () => {

  try {

    await prisma.$connect();

    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
};

startServer();

// try {

//   await sql`SELECT 1`;

//   console.log("✅ Database connected successfully");

//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });

// } catch (error) {
//   console.log(error);
// }
