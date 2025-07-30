import { RegisterBody } from '../interfaces/auth.interfaces';
import UserResponseDTO from '../dtos/UserResponseDTO';
import CreateUserDTO from '../dtos/CreateUserDTO';
import userDAO from '../daos/UserDAO';

const registerUser = async (user: RegisterBody): Promise<UserResponseDTO> => {
  const dto = new CreateUserDTO(user);
  const newUserEntity = await userDAO.createUser(dto);
  return new UserResponseDTO(newUserEntity);
};

const getUserByEmail = async (email: string) => {
  // const dto = /* hacer DTO para email? */
  const userEntity = await userDAO.getUserByEmail(email);
  if (!userEntity) {
    return null;
  }
  return new UserResponseDTO(userEntity);
};

export default {
  registerUser,
  getUserByEmail
};