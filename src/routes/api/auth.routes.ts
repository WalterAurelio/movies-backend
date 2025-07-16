import { Router } from "express";
import { registerUser, login, logout, refresh, registerUser_2 } from "../../controllers/auth.controller";
import { validateRegister } from "../../middlewares/validateRegister";
import { validateLogin } from "../../middlewares/validateLogin";
import { Database } from '../../types/database';

export default function(database: Database) {
  const router = Router();

  router.post('/register', registerUser_2(database));
/*   router.post('/register', validateRegister, registerUser); */
  // router.post('/login', validateLogin, login);
  // router.get('/logout', logout);
  // router.get('/refresh-token', refresh);

  return router;
}

// export default router;