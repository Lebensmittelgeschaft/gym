import { userModel } from './user.model';
import { IUser } from './user.interface';

export class User implements Partial<IUser> {

  userId: string;
  firstName: string;
  lastName: string;
  weight: number;
  height: number;
  gender: string;
  fatPercentage: number;

  constructor(userId: string, firstName: string, lastName: string, weight: number,
              height: number, gender: string, fatPercentage: number) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
    this.fatPercentage = fatPercentage;
  }
}
