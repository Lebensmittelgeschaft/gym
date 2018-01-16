"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userScheme = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        unique: true,
    },
    firstName: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    lastName: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    weight: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        min: [0, 'weight must be positive!'],
    },
    height: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        min: [0, 'height must be positive!'],
    },
    gender: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        enum: {
            values: ['male', 'female'],
            message: '`{VALUE}` is invalid. You must enter male or female',
        },
    },
    fatPercentage: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        min: [0, 'fat percentage must be in 0-100 range!'],
        max: [100, 'fat percentage must be in 0-100 range!'],
    },
});
exports.userModel = mongoose_1.model('user', userScheme);
//# sourceMappingURL=user.model.js.map