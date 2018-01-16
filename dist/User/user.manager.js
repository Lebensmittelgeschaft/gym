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
const user_model_1 = require("./user.model");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
class UserManager {
    findUserById(id) {
        try {
            return user_model_1.userModel.findOne({ userId: id });
        }
        catch (exception) {
            return Promise.reject(exception);
        }
    }
    findAll() {
        try {
            return user_model_1.userModel.find({});
        }
        catch (exception) {
            return Promise.reject(exception);
        }
    }
    addUser(user) {
        try {
            const newUser = new user_model_1.userModel(user);
            return newUser.save();
        }
        catch (exception) {
            return Promise.reject(exception);
        }
    }
    updateUser(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findUserById(id);
                if (user !== null) {
                    user.userId = value.userId ? value.userId : user.userId;
                    user.firstName = value.firstName ? value.firstName : user.firstName;
                    user.lastName = value.lastName ? value.lastName : user.lastName;
                    user.weight = value.weight ? value.weight : user.weight;
                    user.height = value.height ? value.height : user.height;
                    user.gender = value.gender ? value.gender : user.gender;
                    user.fatPercentage = value.fatPercentage ? value.fatPercentage : user.fatPercentage;
                    const newUser = new user_model_1.userModel(user);
                    return newUser.save();
                }
                return Promise.reject('no exist id');
            }
            catch (exception) {
                return Promise.reject(exception);
            }
        });
    }
    deleteUser(user) {
        try {
            return user_model_1.userModel.findOneAndRemove(user);
        }
        catch (exception) {
            Promise.reject(exception);
        }
    }
    deleteUserById(id) {
        try {
            return user_model_1.userModel.findOneAndRemove({ userId: id });
        }
        catch (exception) {
            Promise.reject(exception);
        }
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=user.manager.js.map