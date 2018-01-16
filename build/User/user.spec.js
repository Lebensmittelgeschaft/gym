"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_manager_1 = require("./user.manager");
const chai_1 = require("chai");
const userManager = new user_manager_1.UserManager();
describe('User Manager', () => {
    describe('Find User by Id', () => {
        before(() => {
            // runs before all tests in this block
            const user = {
                userId: '1',
                firstName: 'Gal',
                lastName: 'Shiff',
                weight: '75.5',
                height: '195',
                gender: 'male',
                fatPercentage: 50,
            };
        });
        it('should find a user by id', () => {
            const result = userManager.findUserById(this.user.userId);
            console.log('Result- exist id:', result);
            chai_1.expect(result).to.equal(this.user);
        });
        it('should return empty object', () => {
            const result = userManager.findUserById(this.user.userId);
            console.log('Result- no exist id:', result);
            chai_1.expect(result).to.equal(undefined);
        });
    });
});
//# sourceMappingURL=user.spec.js.map