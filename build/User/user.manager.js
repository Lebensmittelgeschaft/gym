"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const mongoose_1 = require("mongoose");
class UserManager {
    findUserById(id) {
        try {
            return user_model_1.userModel.findOne({ user_id: id });
        }
        catch (exception) {
            return mongoose_1.Promise.reject(exception);
        }
    }
    findAll(id) {
        try {
            return user_model_1.userModel.find({});
        }
        catch (exception) {
            return mongoose_1.Promise.reject(exception);
        }
    }
    addUser(user) {
        try {
            if (!this.findUserById(user.userId)) {
                const newUser = new user_model_1.userModel(user);
                return newUser.save();
            }
        }
        catch (exception) {
            return mongoose_1.Promise.reject(exception);
        }
    }
    updateUser(id, value) {
        try {
            const user = this.findUserById(id);
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
        catch (exception) {
            return mongoose_1.Promise.reject(exception);
        }
    }
    deleteUser(user) {
        try {
            user_model_1.userModel.remove(user);
        }
        catch (exception) {
            mongoose_1.Promise.reject(exception);
        }
    }
    deleteUserById(id) {
        try {
            user_model_1.userModel.remove({ user_id: id });
        }
        catch (exception) {
            mongoose_1.Promise.reject(exception);
        }
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=user.manager.js.map