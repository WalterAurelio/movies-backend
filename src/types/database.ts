import { RegisterBody } from '../interfaces/auth.interfaces';

export interface Database {
  registerUser: (newUser: RegisterBody) => Promise<number>;
  getUserByEmail: (email: string) => Promise<RegisterBody>;
}