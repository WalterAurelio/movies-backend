import { IUserCore } from '../entities/User';

/*
  aquí definimos la estructura que tendrá el dato que devolverá nuestro service; la clase UserResponseDTO recibe un objeto ya normalizado (entidad interna User, que implementa la interface IUserCore) y con él define la estructura del objeto que enviaremos al cliente; es decir, esta clase UserResponseDTO recibe un objeto ya normalizado (de TypeScript "puro"), por lo que ESTA CLASE ME SIRVE PARA CUALQUIER BASE DE DATOS, ya que nunca trabaja con la respuesta pura de la base de datos;
*/

class UserResponseDTO {
  userId: string;

  constructor(data: IUserCore) {
    this.userId = data.id;
  }
}

export default UserResponseDTO;