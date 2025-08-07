import express from 'express';
import { IUserController } from './controllers/auth.controller';
import router from './routes/api/auth.routes';

export default function(controller: IUserController) {
  const app = express();
  app.use(express.json());

  app.use('/api/auth', router(controller));

  return app;
}