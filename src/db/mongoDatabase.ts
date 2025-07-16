import User from '../models/User_2';
import { Database } from '../types/database';
import bcrypt from 'bcrypt';

export const mongoDatabase: Database = {
  registerUser: async (user) => {
    const { firstname, lastname, email, password } = user;

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPwd
    });
    
    return newUser._id.toString();
  },
  getUserByEmail: async (email) => {
    const user = await User.findOne({ email }).lean(); // lean() convierte un documento de Mongo (que tiene métodos como save()que, en este caso, no serán utilizados) en un objeto plano, el cual es más liviano;
    return user;
  }
}