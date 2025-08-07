import { Router } from 'express';
import { IUserController } from '../../controllers/auth.controller';

export default function(controller: IUserController) {
  const router = Router();
  
  router.post('/register', controller.registerUser);

  return router;
}