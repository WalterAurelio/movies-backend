import { IUserCore } from '../types/user.interface';

/*
  2) aquí definimos la interface UserResponseDTO, que será la estructura que tendrá el dato que enviemos en la
  respuesta al cliente;
  el transformer/mapper toUserResponseDTO() parte de un objeto de TypeScript "puro" (de interface IUserCore) para definir
  el objeto (dato) que enviaremos al cliente (objeto que tendrá la interface UserResponseDTO);
  
  es decir, este transformer ya recibe como parámetro un objeto normalizado de TypeScript "puro", NO recibe la respuesta
  pura de la base de datos, por lo que ESTE TRANSFORMER SÍ ME SIRVE PARA CUALQUIER BASE DE DATOS, YA QUE NUNCA TRABAJA CON
  LA RESPUESTA DIRECTA DE LA BASE DE DATOS;
*/

interface UserResponseDTO {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
}

export function toUserResponseDTO(user: IUserCore): UserResponseDTO {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    createdAt: user.createdAt.toISOString()
  }
}