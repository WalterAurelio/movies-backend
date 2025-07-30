import { RegisterBody } from '../interfaces/auth.interfaces';

/*
  aquí definimos la interface ICreateUserDTO, que será la interface que usará el service para normalizar el body antes de pasárselo al DAO; es decir, se recibe un body (de interface RegisterBody) y con él se instancia un objeto de clase CreateUserDTO, y es este objeto normalizado el que se le pasa al DAO;
*/

export interface ICreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

class CreateUserDTO implements ICreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(data: RegisterBody) {
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = data.password;
  }
}

export default CreateUserDTO;