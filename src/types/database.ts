import { RegisterBody } from '../interfaces/auth.interfaces';
import { IUser } from '../models/User_2';

export interface Database {
  registerUser: (user: RegisterBody) => Promise<string>; // la promesa (es decir, mongoose interactuando con la base de datos) resuelve en un string que tendrá, en este caso, el ID del usuario (yo defino qué resolverá la promesa)
  getUserByEmail: (email: string) => Promise<IUser | null>;
}