import { ICreateUserDTO } from '../dtos/CreateUserDTO';
import { IUserCore } from '../entities/User';
import User from '../models/User_2';
import UserEntity from '../entities/User';

export interface IUserDAO {
  createUser: (user: ICreateUserDTO) => Promise<IUserCore>;
  getUserByEmail: (email: string) => Promise<IUserCore | null>;
}

const createUser = async (user: ICreateUserDTO): Promise<IUserCore> => {
  const newUserRaw = await User.create(user);
  return new UserEntity(newUserRaw);
};

const getUserByEmail = async (email: string): Promise<IUserCore | null> => {
  const userRaw = await User.findOne({ email });
  return userRaw ? new UserEntity(userRaw) : null;
};

export default {
  createUser,
  getUserByEmail
};