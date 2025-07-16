import { IUser } from '../models/User_2';
import { IUserCore } from '../types/user.interface';

/*
  1) este mapper recibe un documento IUser de Mongo y lo normaliza a TypeScript "puro" (interface IUserCore) para, a partir
  de este objeto normalizado, definir los DTOs que se envíen al cliente;
  es decir, solo sirve para normalizar documentos/registros provenientes de Mongo;
  en caso de cambiar de base de datos, se debería crear un mapper para la estructura de los registros de dicha
  base de datos (ya que, por ejemplo, puede suceder que en PostgreSQL los registros no tengan el campo _id);

  ESTE MAPPER SERÁ EL ÚNICO EN TENER CONTACTO CON LA RESPUESTA "PURA" DE LA BASE DE DATOS;
*/

export function fromMongoose(user: IUser): IUserCore {
  return {
    id: user._id.toString(),
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}