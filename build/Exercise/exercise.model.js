"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const exerciseScheme = new mongoose_1.Schema({
    exerciseName: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        unique: true,
    },
    muscle: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    difficulty: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        min: [0, 'difficulty must be in 0-5 range!'],
        max: [5, 'difficulty must be in 0-5 range!'],
    },
    description: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
});
exports.exerciseModel = mongoose_1.model('exercise', exerciseScheme);
//# sourceMappingURL=exercise.model.js.map