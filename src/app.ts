import express from 'express';
import authRouter from './routes/api/auth.routes';
import { Database } from './types/database';

export default function(database: Database) {
  const app = express();
  app.use(express.json());

  app.use('/api/auth', authRouter(database));

  return app;
}