import { Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  weight: number;
  height: number;
  gender: string;
  fatPercentage: number; 
}
