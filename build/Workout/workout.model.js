"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutScheme = new mongoose_1.Schema({
    workout_list: {
        type: mongoose_1.SchemaTypes.Array,
        required: true,
        unique: true,
    },
});
exports.workoutModel = mongoose_1.model('workout', workoutScheme);
//# sourceMappingURL=workout.model.js.map