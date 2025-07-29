import { IUserCore } from '../types/user.interface';

/*
  2) aquí definimos la interface ICreateUserDTO, que será la estructura que tendrá el dato que enviemos en la
  respuesta al cliente;
  el mapper createUserDTO() recibe de un objeto de TypeScript "puro" (entidad interna) para definir
  el objeto que enviaremos al cliente (objeto que tendrá la interface ICreateUserDTO);
  
  es decir, este mapper ya recibe por parámetro un objeto normalizado (entidad interna) de TypeScript "puro",
  NO recibe la respuesta pura de la base de datos, por lo que ESTE MAPPER ME SIRVE PARA CUALQUIER BASE DE DATOS,
  YA QUE NUNCA TRABAJA CON LA RESPUESTA DIRECTA DE LA BASE DE DATOS;
*/

export interface ICreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

class CreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor({ firstname, lastname, email, password }: IUserCore) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password
  }
}

export default CreateUserDTO;