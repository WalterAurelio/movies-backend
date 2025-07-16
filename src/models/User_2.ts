import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUserCore } from '../types/user.interface';

/*
  IUser será la estructura que tendrán los User que devuelva la base de datos;
  lo hacemos para que TypeScript sepa que un documento User (por ejemplo, const user) tiene los atributos de la interface
  IUserCore (como user.firstname) y los atributos y métodos de Document (como user.save())
*/

export interface IUser extends Omit<IUserCore, 'id'>, Document {
  _id: Types.ObjectId;
}

const userSchema = new Schema<IUser>({  /* se recomienda pasarle siempre un generic */
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;