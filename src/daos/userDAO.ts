import { IUserCore } from '../entities/User';
import User from '../models/User_2';
import UserEntity from '../entities/User';
import { ICreateUserDTO } from '../dtos/CreateUserDTO'

const createUser = async (user: ICreateUserDTO): Promise<IUserCore> => {
  const newUserRaw = await User.create(user);
  return new UserEntity(newUserRaw);
};

const getUserByEmail = async (email: string): Promise<IUserCore | null> => {
  const userRaw = await User.findOne({ email });
  if (!userRaw) {
    return null;
  }
  return new UserEntity(userRaw);
};

export default {
  createUser,
  getUserByEmail
};