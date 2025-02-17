import { Router } from "express";
import { registerUser, login, logout, refresh } from "../../controllers/auth.controller";
import { validateRegister } from "../../middlewares/zValidateRegister";
import { validateLogin } from "../../middlewares/zValidateLogin";
const router = Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, login);
router.get('/logout', logout);
router.get('/refresh-token', refresh);

export default router;