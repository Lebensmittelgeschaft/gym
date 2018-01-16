import { userModel } from './user.model';
import { IUser } from './user.interface';
import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

export class UserManager {

  public findUserById(id: string) {
    try {
      return userModel.findOne({ userId: id });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public findAll() {
    try {
      return userModel.find({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public addUser(user: IUser) {
    try {
      const newUser = new userModel(user);
      return newUser.save();
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public async updateUser(id, value: Partial<IUser>) {
    try {
      const user: IUser = <IUser>await this.findUserById(id);
      if (user !== null) {
        user.userId = value.userId ? value.userId : user.userId;
        user.firstName = value.firstName ? value.firstName : user.firstName;
        user.lastName = value.lastName ? value.lastName : user.lastName;
        user.weight = value.weight ? value.weight : user.weight;
        user.height = value.height ? value.height : user.height;
        user.gender = value.gender ? value.gender : user.gender;
        user.fatPercentage = value.fatPercentage ? value.fatPercentage : user.fatPercentage;
        const newUser = new userModel(user);
        return newUser.save();
      }
      return Promise.reject('no exist id');
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public deleteUser(user: IUser) {
    try {
      return userModel.findOneAndRemove(user);
    } catch (exception) {
      Promise.reject(exception);
    }
  }

  public deleteUserById(id: string) {
    try {
      return userModel.findOneAndRemove({ userId: id });
    } catch (exception) {
      Promise.reject(exception);
    }
  }

}
