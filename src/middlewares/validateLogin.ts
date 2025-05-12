import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../interfaces/movies.interfaces';

const typeErrorMsg = 'El valor ingresado no es válido.';
const requiredErrorMsg = 'Este campo es obligatorio.';

const LoginBody = z.object({
  email: z.string({
    invalid_type_error: typeErrorMsg,
    required_error: requiredErrorMsg
  }).email({ message: typeErrorMsg }),
  password: z.string({
    invalid_type_error: typeErrorMsg,
    required_error: requiredErrorMsg
  }),
});

type TLoginBody = z.infer<typeof LoginBody>;

export const validateLogin = (req: Request<{}, {}, TLoginBody>, res: Response<ApiResponse>, next: NextFunction) => {
  const result = LoginBody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.errors });
  }
  next();
}