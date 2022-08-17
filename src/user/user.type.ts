import { Document } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
