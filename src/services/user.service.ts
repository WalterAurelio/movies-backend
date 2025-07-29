import { ICreateUserDTO } from '../dtos/createUserDTO';
import userDAO from '../daos/userDAO';
import UserResponseDTO from '../dtos/userResponseDTO';

const registerUser = async (user: ICreateUserDTO): Promise<UserResponseDTO> => {
  const newUser = await userDAO.createUser(user);
  return new UserResponseDTO(newUser);
};

export default {
  registerUser
}