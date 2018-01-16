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
const exercise_manager_1 = require("./exercise.manager");
const chai_1 = require("chai");
const exercise_model_1 = require("./exercise.model");
const mongoose = require("mongoose");
const exerciseManager = new exercise_manager_1.ExerciseManager();
const exercise = {
    exerciseName: '1',
    muscle: 'chest',
    difficulty: 4,
    description: '123',
};
const exercise2 = {
    exerciseName: '2',
    muscle: 'chest',
    difficulty: 4,
    description: '123',
};
describe('Exercise Manager', () => {
    /* before (async () => {
      await mongoose.connection.db.dropDatabase();
    }); */
    describe('Add Exercise', () => {
        it('should add a new exercise', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.addExercise(exercise);
            chai_1.expect(result).to.have.property('_id');
        }));
        it('should return empty object', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const a = yield exerciseManager.addExercise(exercise);
            }
            catch (exe) {
                chai_1.expect(exe).to.have.property('name', 'MongoError');
            }
        }));
    });
    // -----------------------------------------------------------------------
    describe('Find Exercise by Name', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('exercises');
            const newExercise = new exercise_model_1.exerciseModel(exercise);
            const a = yield newExercise.save();
        }));
        it('should find a exercise by id', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.findExerciseByName(exercise.exerciseName);
            chai_1.expect(result).to.have.property('exerciseName', '1');
        }));
        it('should return empty object', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.findExerciseByName('2');
            chai_1.expect(result).to.not.exist;
        }));
        // no exercises in the db:
        it('should return exception', () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('exercises');
            const result = yield exerciseManager.findExerciseByName('2');
            chai_1.expect(result).to.not.exist;
        }));
    });
    // -----------------------------------------------------------------------
    describe('Find All Exercises', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            // mongoose.connection.db.dropCollection('exercises');
            const newExerciseA = new exercise_model_1.exerciseModel(exercise);
            const a = yield newExerciseA.save();
            const newExerciseB = new exercise_model_1.exerciseModel(exercise2);
            const b = yield newExerciseB.save();
        }));
        it('should find all exercises', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.findAll();
            const firstExercise = result[0];
            const secondExercise = result[1];
            chai_1.expect(firstExercise).to.have.property('exerciseName', '1');
            chai_1.expect(secondExercise).to.have.property('exerciseName', '2');
        }));
        it('should return empty object', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.findExerciseByName('3');
            chai_1.expect(result).to.not.exist;
        }));
        // no exercises in the db:
        it('should return exception', () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('exercises');
            const result = yield exerciseManager.findExerciseByName('2');
            chai_1.expect(result).to.not.exist;
        }));
    });
    // -----------------------------------------------------------------------
    describe('Update exercise', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            // mongoose.connection.db.dropCollection('exercises');
            const newExerciseA = new exercise_model_1.exerciseModel(exercise);
            const a = yield newExerciseA.save();
        }));
        it('should update the exercise data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.
                updateExercise(exercise.exerciseName, { muscle: 'legs' });
            chai_1.expect(result).to.have.property('muscle', 'legs');
        }));
        it('should update the exercise data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.
                updateExercise(exercise.exerciseName, { muscle: 'legs', description: '456' });
            chai_1.expect(result).to.have.property('muscle', 'legs');
            chai_1.expect(result).to.have.property('description', '456');
        }));
        it('should not update the exercise data', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const a = yield exerciseManager.updateExercise('10', { muscle: 'legs' });
            }
            catch (exe) {
                chai_1.expect(exe).to.equal('no exist name');
            }
        }));
    });
    // -----------------------------------------------------------------------
    describe('Delete exercise', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('exercises');
            const newExerciseA = new exercise_model_1.exerciseModel(exercise);
            const a = yield newExerciseA.save();
        }));
        it('should delete the exercise data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.deleteExercise(exercise);
            chai_1.expect(result).to.have.property('exerciseName', '1');
        }));
        it('should not update the exercise data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.deleteExercise(exercise);
            chai_1.expect(result).to.not.exist;
        }));
    });
    // -----------------------------------------------------------------------
    describe('Delete exercise by id', () => {
        before(() => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.db.dropCollection('exercises');
            const newExerciseA = new exercise_model_1.exerciseModel(exercise);
            const a = yield newExerciseA.save();
        }));
        it('should delete the exercise data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.deleteExerciseByName(exercise.exerciseName);
            chai_1.expect(result).to.have.property('exerciseName', '1');
        }));
        it('should not update the exercise data', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield exerciseManager.deleteExerciseByName(exercise.exerciseName);
            chai_1.expect(result).to.not.exist;
        }));
    });
});
//# sourceMappingURL=exercise.spec.js.map