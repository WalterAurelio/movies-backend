import { RegisterBody } from '../interfaces/auth.interfaces';
import UserResponseDTO from '../dtos/UserResponseDTO';
import { IUserDAO } from '../daos/user.dao';
import CreateUserDTO from '../dtos/CreateUserDTO';

export interface IUserService {
  registerUser: (user: RegisterBody) => Promise<UserResponseDTO>,
  getUserByEmail: (email: string) => Promise<UserResponseDTO | null>
}

export default function(userDAO: IUserDAO): IUserService {
  return {
    registerUser: async (user: RegisterBody): Promise<UserResponseDTO> => {
      const dto = new CreateUserDTO(user);
      const newUserEntity = await userDAO.createUser(dto);
      return new UserResponseDTO(newUserEntity);
    },
    getUserByEmail: async (email: string): Promise<UserResponseDTO | null> => {
      // const dto = /* hacer DTO para email? */
      const userEntity = await userDAO.getUserByEmail(email);
      return userEntity ? new UserResponseDTO(userEntity) : null;
    }
  }
}