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
const exercise_model_1 = require("./exercise.model");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
class ExerciseManager {
    findExerciseByName(name) {
        try {
            return exercise_model_1.exerciseModel.findOne({ exerciseName: name });
        }
        catch (exception) {
            return Promise.reject(exception);
        }
    }
    findAll() {
        try {
            return exercise_model_1.exerciseModel.find({});
        }
        catch (exception) {
            return Promise.reject(exception);
        }
    }
    addExercise(exercise) {
        try {
            const newExercise = new exercise_model_1.exerciseModel(exercise);
            return newExercise.save();
        }
        catch (exception) {
            return Promise.reject(exception);
        }
    }
    updateExercise(name, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercise = yield this.findExerciseByName(name);
                if (exercise !== null) {
                    exercise.exerciseName = value.exerciseName ? value.exerciseName : exercise.exerciseName;
                    exercise.muscle = value.muscle ? value.muscle : exercise.muscle;
                    exercise.difficulty = value.difficulty ? value.difficulty : exercise.difficulty;
                    exercise.description = value.description ? value.description : exercise.description;
                    const newExercise = new exercise_model_1.exerciseModel(exercise);
                    return newExercise.save();
                }
                return Promise.reject('no exist name');
            }
            catch (exception) {
                return Promise.reject(exception);
            }
        });
    }
    deleteExercise(exercise) {
        try {
            return exercise_model_1.exerciseModel.findOneAndRemove(exercise);
        }
        catch (exception) {
            Promise.reject(exception);
        }
    }
    deleteExerciseByName(name) {
        try {
            return exercise_model_1.exerciseModel.findOneAndRemove({ exerciseName: name });
        }
        catch (exception) {
            Promise.reject(exception);
        }
    }
}
exports.ExerciseManager = ExerciseManager;
//# sourceMappingURL=exercise.manager.js.map