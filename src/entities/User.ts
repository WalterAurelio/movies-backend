import { IUser } from '../models/User_2'; 

class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({ _id, firstname, lastname, email, password, createdAt, updatedAt}: IUser) {
    this.id = _id.toString();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default User;