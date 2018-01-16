"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutScheme = new mongoose_1.Schema({
    workout_list: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'exercise',
    },
});
exports.workoutModel = mongoose_1.model('workout', workoutScheme);
//# sourceMappingURL=workout.model.js.map