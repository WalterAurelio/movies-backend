import { IUser } from '../models/User_2';

/*
  IUserCore es nuestra interface "pura" (entidad interna) de TypeScript que usaremos para normalizar los User que provengan de CUALQUIER base de datos; es decir, cualquier DAO que interactúe DIRECTAMENTE con la respuesta PURA de la base de datos deberá RETORNAR UN OBJETO QUE IMPLEMENTE ESTA INTERFACE (es decir, retornará un objeto de clase User, la cual ya implementa la interface IUserCore); y es a partir de esta interface que definiremos los DTOs que enviaremos al cliente;
*/

export interface IUserCore {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

class User implements IUserCore {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IUser) { // recibe un documento User de Mongo (interface IUser) y lo normaliza a la interface IUserCore
    this.id = data._id.toString();
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export default User;