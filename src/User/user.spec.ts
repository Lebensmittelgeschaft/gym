import { UserManager } from './user.manager';
import { expect } from 'chai';
import { IUser } from './user.interface';
import { config } from '../config';
import { userModel } from './user.model';
import mongoose = require('mongoose');

const userManager = new UserManager();

const user: IUser = <IUser>{
  userId: '1',
  firstName: 'Gal',
  lastName: 'Shiff',
  weight: 75.5,
  height: 190,
  gender: 'male',
  fatPercentage: 50,
};


const user2: IUser = <IUser>{
  userId: '2',
  firstName: 'Gal',
  lastName: 'Shiff',
  weight: 75.5,
  height: 190,
  gender: 'male',
  fatPercentage: 50,
};


describe('User Manager', () => {

  describe('Add User', () => {

    it('should add a new user',async () => {
      const result = await userManager.addUser(user);
      expect(result).to.have.property('_id');
    });

    it('should return empty object',async () => {
      try {
        const a = await userManager.addUser(user);
      } catch (exe) {
        expect(exe).to.have.property('name', 'MongoError');
      }
    });

  });

  // -----------------------------------------------------------------------
  
  describe('Find User by Id', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('users');
      const newUser = new userModel(user);
      const a = await newUser.save();
    });

    it('should find a user by id', async () => {
      const result = await userManager.findUserById(user.userId);
      expect(result).to.have.property('firstName', 'Gal');
    });

    it('should return empty object', async () => {
      const result = await userManager.findUserById('2');
      expect(result).to.not.exist;
    });

    // no users in the db:
    it('should return exception', async () => {
      await mongoose.connection.db.dropCollection('users');
      const result = await userManager.findUserById('2');
      expect(result).to.not.exist;
    });

  });


  // -----------------------------------------------------------------------


  describe('Find All Users', () => {

    before(async () => {
      // mongoose.connection.db.dropCollection('users');
      const newUserA = new userModel(user);
      const a = await newUserA.save();
      const newUserB = new userModel(user2);
      const b = await newUserB.save();
    });

    it('should find all users', async () => {
      const result = await userManager.findAll();
      const firstUser = result[0];
      const secondUser = result[1];
      expect(firstUser).to.have.property('userId', '1');
      expect(secondUser).to.have.property('userId', '2');
    });

    it('should return empty object', async () => {
      const result = await userManager.findUserById('3');
      expect(result).to.not.exist;
    });

    // no users in the db:
    it('should return exception', async () => {
      await mongoose.connection.db.dropCollection('users');
      const result = await userManager.findUserById('2');
      expect(result).to.not.exist;
    });

  });

  // -----------------------------------------------------------------------


  describe('Update user', () => {

    before(async () => {
      // mongoose.connection.db.dropCollection('users');
      const newUserA = new userModel(user);
      const a = await newUserA.save();
    });

    it('should update the user data', async () => {
      const result = await userManager.updateUser(user.userId, { fatPercentage : 90 });
      expect(result).to.have.property('fatPercentage', 90);
    });

    it('should not update the user data', async () => {
      try {
        const a = await userManager.updateUser('10', { fatPercentage : 90 });
      } catch (exe) {
        expect(exe).to.equal('no exist id');
      }
    });

    // not exist property.
  });

  
  // -----------------------------------------------------------------------


  describe('Delete user', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('users');
      const newUserA = new userModel(user);
      const a = await newUserA.save();
    });


    it('should delete the user data', async () => {
      const result = await userManager.deleteUser(user);
      expect(result).to.have.property('userId', '1');
    });

    it('should not update the user data', async () => {
      const result = await userManager.deleteUser(user);
      expect(result).to.not.exist;
    });
  });


  // -----------------------------------------------------------------------


  describe('Delete user by id', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('users');
      const newUserA = new userModel(user);
      const a = await newUserA.save();
    });


    it('should delete the user data', async () => {
      const result = await userManager.deleteUserById(user.userId);
      expect(result).to.have.property('userId', '1');
    });

    it('should not update the user data', async () => {
      const result = await userManager.deleteUserById(user.userId);
      expect(result).to.not.exist;
    });
  });  

});
