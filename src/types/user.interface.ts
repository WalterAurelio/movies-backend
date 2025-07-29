/*
  esta es nuestra interface "pura" (entidad interna) de TypeScript que usaremos para normalizar los User que provengan de
  cualquier base de datos;
  es decir, cualquier mapper (DAO) que interactúe DIRECTAMENTE con la respuesta pura de la base de datos deberá RETORNAR
  UN OBJETO CON ESTA ESTRUCTURA (interface);
  a partir de esta interface es que definiremos los DTOs que enviaremos al cliente;
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