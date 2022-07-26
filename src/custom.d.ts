import { Document, Types } from 'mongoose';
import { IUser, IUserMethods } from './models/userModel';

declare global {
  namespace Express {
    export interface Request {
      user?: Document<Types.ObjectId, object, IUser> &
        IUser &
        IUserMethods & { _id: Types.ObjectId };
    }
  }
}
