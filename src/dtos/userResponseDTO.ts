import { IUserCore } from '../types/user.interface';

class UserResponseDTO {
  userId: string;

  constructor({ id }: IUserCore) {
    this.userId = id;
  }
}

export default UserResponseDTO;