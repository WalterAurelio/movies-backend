import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../interfaces/movies.interfaces';
import validationMessages from '../utils/validationMessages';

const { invalidMsg, requiredMsg, email } = validationMessages;

const LoginBody = z.object({
  email: z
    .string({
      invalid_type_error: invalidMsg,
      required_error: requiredMsg
    })
    .email({ message: email.invalidMsg }),
  password: z.string({
    invalid_type_error: invalidMsg,
    required_error: requiredMsg
  })
});

type TLoginBody = z.infer<typeof LoginBody>;

export const validateLogin = (req: Request<{}, {}, TLoginBody>, res: Response<ApiResponse>, next: NextFunction) => {
  const result = LoginBody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.errors });
  }
  next();
};
