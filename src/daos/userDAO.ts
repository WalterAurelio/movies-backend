import { ICreateUserDTO } from '../dtos/createUserDTO';
import { IUserCore } from '../types/user.interface';
import User from '../models/User_2';
import UserEntity from '../entities/User';

const createUser = async (user: ICreateUserDTO): Promise<IUserCore> => {
  const newUser = await User.create(user);
  return new UserEntity(newUser);
}

/* const getUserByEmail = async (email: string): Promise<IUserCore | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;


} */

export default {
  createUser
};
