"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_manager_1 = require("./user.manager");
const chai_1 = require("chai");
const user_model_1 = require("./user.model");
const mongoose = require("mongoose");
const userManager = new user_manager_1.UserManager();
const user = {
    userId: '1',
    firstName: 'Gal',
    lastName: 'Shiff',
    weight: 75.5,
    height: 190,
    gender: 'male',
    fatPercentage: 50,
};
const user2 = {
    userId: '2',
    firstName: 'Gal',
    lastName: 'Shiff',
    weight: 75.5,
    height: 190,
    gender: 'male',
    fatPercentage: 50,
};
describe('User Manager', () => {
    /* before (async () => {
      await mongoose.connection.db.dropDatabase();
    }); */
    describe('Add User', () => {
        it('should add a new user', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.addUser(user);
            chai_1.expect(result).to.have.property('_id');
        }));
        it('should return empty object', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const a = yield userManager.addUser(user);
            }
            catch (exe) {
                chai_1.expect(exe).to.have.property('name', 'MongoError');
            }
        }));
    });
    // -----------------------------------------------------------------------
    describe('Find User by Id', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('users');
            const newUser = new user_model_1.userModel(user);
            const a = yield newUser.save();
        }));
        it('should find a user by id', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.findUserById(user.userId);
            chai_1.expect(result).to.have.property('firstName', 'Gal');
        }));
        it('should return empty object', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.findUserById('2');
            chai_1.expect(result).to.not.exist;
        }));
        // no users in the db:
        it('should return exception', () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('users');
            const result = yield userManager.findUserById('2');
            chai_1.expect(result).to.not.exist;
        }));
    });
    // -----------------------------------------------------------------------
    describe('Find All Users', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            // mongoose.connection.db.dropCollection('users');
            const newUserA = new user_model_1.userModel(user);
            const a = yield newUserA.save();
            const newUserB = new user_model_1.userModel(user2);
            const b = yield newUserB.save();
        }));
        it('should find all users', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.findAll();
            const firstUser = result[0];
            const secondUser = result[1];
            chai_1.expect(firstUser).to.have.property('userId', '1');
            chai_1.expect(secondUser).to.have.property('userId', '2');
        }));
        it('should return empty object', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.findUserById('3');
            chai_1.expect(result).to.not.exist;
        }));
        // no users in the db:
        it('should return exception', () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('users');
            const result = yield userManager.findUserById('2');
            chai_1.expect(result).to.not.exist;
        }));
    });
    // -----------------------------------------------------------------------
    describe('Update user', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            // mongoose.connection.db.dropCollection('users');
            const newUserA = new user_model_1.userModel(user);
            const a = yield newUserA.save();
        }));
        it('should update the user data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.updateUser(user.userId, { fatPercentage: 90 });
            chai_1.expect(result).to.have.property('fatPercentage', 90);
        }));
        it('should not update the user data', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const a = yield userManager.updateUser('10', { fatPercentage: 90 });
            }
            catch (exe) {
                chai_1.expect(exe).to.equal('no exist id');
            }
        }));
    });
    // -----------------------------------------------------------------------
    describe('Delete user', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('users');
            const newUserA = new user_model_1.userModel(user);
            const a = yield newUserA.save();
        }));
        it('should delete the user data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.deleteUser(user);
            chai_1.expect(result).to.have.property('userId', '1');
        }));
        it('should not update the user data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.deleteUser(user);
            chai_1.expect(result).to.not.exist;
        }));
    });
    // -----------------------------------------------------------------------
    describe('Delete user by id', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('users');
            const newUserA = new user_model_1.userModel(user);
            const a = yield newUserA.save();
        }));
        it('should delete the user data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.deleteUserById(user.userId);
            chai_1.expect(result).to.have.property('userId', '1');
        }));
        it('should not update the user data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.deleteUserById(user.userId);
            chai_1.expect(result).to.not.exist;
        }));
    });
});
//# sourceMappingURL=user.spec.js.map