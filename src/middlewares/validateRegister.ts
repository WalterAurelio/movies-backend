import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../interfaces/movies.interfaces";

const RegisterBody = z.object({
  firstname: z.string({ invalid_type_error: 'El formato del nombre ingresado es inválido.', required_error: 'El campo nombre es obligatorio.' }).min(3, 'El nombre debe tener al menos 3 caracteres.'),
  lastname: z.string({ invalid_type_error: 'El formato del apellido ingresado es inválido.', required_error: 'El campo apellido es obligatorio.' }).min(3, 'El apellido debe tener al menos 3 caracteres.'),
  email: z.string({ required_error: 'El campo correo electrónico es obligatorio.' }).email({ message: 'El formato del correo electrónico ingresado es inválido.' }),
  password: z.string({ required_error: 'El campo contraseña es obligatorio.' }).min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
});

type TRegisterBody = z.infer<typeof RegisterBody>;

export const validateRegister = (req: Request<{}, {}, TRegisterBody>, res: Response<ApiResponse>, next: NextFunction) => {
  const result = RegisterBody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.errors });
  }
  next();
}