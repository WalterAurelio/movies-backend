import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../interfaces/movies.interfaces';

const LoginBody = z.object({
  email: z.string({ required_error: 'El campo correo electrónico es obligatorio.' }).email({ message: 'El formato del correo electrónico ingresado es inválido.' }),
  password: z.string({ required_error: 'El campo contraseña es obligatorio.' }),
});

type TLoginBody = z.infer<typeof LoginBody>;

export const validateLogin = (req: Request<{}, {}, TLoginBody>, res: Response<ApiResponse>, next: NextFunction) => {
  const result = LoginBody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.errors });
  }
  next();
}