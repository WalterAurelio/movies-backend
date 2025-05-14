import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../interfaces/movies.interfaces';
import validationMessages from '../utils/validationMessages';

const { requiredMsg, invalidMsg, minCharactersMsg, email, password } = validationMessages;

const RegisterBody = z.object({
  firstname: z
    .string({
      invalid_type_error: invalidMsg,
      required_error: requiredMsg
    })
    .min(3, minCharactersMsg(3)),
  lastname: z
    .string({
      invalid_type_error: invalidMsg,
      required_error: requiredMsg
    })
    .min(3, minCharactersMsg(3)),
  email: z
    .string({
      invalid_type_error: invalidMsg,
      required_error: requiredMsg
    })
    .email({ message: email.invalidMsg }),
  password: z
    .string({
      invalid_type_error: invalidMsg,
      required_error: requiredMsg
    })
    .min(5, password.minCharactersMsg(5))
});

type TRegisterBody = z.infer<typeof RegisterBody>;

export const validateRegister = (req: Request<{}, {}, TRegisterBody>, res: Response<ApiResponse>, next: NextFunction) => {
  const result = RegisterBody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.errors });
  }
  next();
};
