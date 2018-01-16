import { exerciseModel } from '../Exercise/exercise.model';
import { IExercise } from '../Exercise/exercise.interface';
import { WorkoutManager } from './workout.manager';
import { expect } from 'chai';
import { IWorkout } from './workout.interface';
import { config } from '../config';
import { workoutModel } from './workout.model';
import mongoose = require('mongoose');
import { ExerciseManager } from '../Exercise/exercise.manager';

const workoutManager = new WorkoutManager();
const exerciseManager = new ExerciseManager();

const exercise:  IExercise = <IExercise>{
  exerciseName: '1',
  muscle: 'chest',
  difficulty: 4,
  description: '123',
};
const newExercise = new exerciseModel(exercise);
const a = newExercise.save();

const workout: IWorkout = <IWorkout>{
  workoutId: '1',
  exercise_list: [{
    exerciseName: 
      exerciseManager.findExerciseByName(exercise.exerciseName)._id,
    repeatNumber: 10,
    setsNumber: 10,
    weights: 10,
  }],
};


/*const workout2: IWorkout = <IWorkout>{
  workoutId: '2',
  firstName: 'Gal',
  lastName: 'Shiff',
  weight: 75.5,
  height: 190,
  gender: 'male',
  fatPercentage: 50,
};*/


describe('Workout Manager', () => {

  describe('Add Workout', () => {

    it('should add a new workout',async () => {
      const result = await workoutManager.addWorkout(workout);
      expect(result).to.have.property('_id');
    });

    it('should return empty object',async () => {
      try {
        const a = await workoutManager.addWorkout(workout);
      } catch (exe) {
        expect(exe).to.have.property('name', 'MongoError');
      }
    });

  });

  // -----------------------------------------------------------------------
  
  describe('Find Workout by Id', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('workouts');
      const newWorkout = new workoutModel(workout);
      const a = await newWorkout.save();
    });

    it('should find a workout by id', async () => {
      const result = await workoutManager.findWorkoutById(workout.workoutId);
      expect(result).to.have.property('firstName', 'Gal');
    });

    it('should return empty object', async () => {
      const result = await workoutManager.findWorkoutById('2');
      expect(result).to.not.exist;
    });

    // no workouts in the db:
    it('should return exception', async () => {
      await mongoose.connection.db.dropCollection('workouts');
      const result = await workoutManager.findWorkoutById('2');
      expect(result).to.not.exist;
    });

  });


  // -----------------------------------------------------------------------


  describe('Find All Workouts', () => {

    before(async () => {
      // mongoose.connection.db.dropCollection('workouts');
      const newWorkoutA = new workoutModel(workout);
      const a = await newWorkoutA.save();
      const newWorkoutB = new workoutModel(workout2);
      const b = await newWorkoutB.save();
    });

    it('should find all workouts', async () => {
      const result = await workoutManager.findAll();
      const firstWorkout = result[0];
      const secondWorkout = result[1];
      expect(firstWorkout).to.have.property('workoutId', '1');
      expect(secondWorkout).to.have.property('workoutId', '2');
    });

    it('should return empty object', async () => {
      const result = await workoutManager.findWorkoutById('3');
      expect(result).to.not.exist;
    });

    // no workouts in the db:
    it('should return exception', async () => {
      await mongoose.connection.db.dropCollection('workouts');
      const result = await workoutManager.findWorkoutById('2');
      expect(result).to.not.exist;
    });

  });

  // -----------------------------------------------------------------------


  describe('Update workout', () => {

    before(async () => {
      // mongoose.connection.db.dropCollection('workouts');
      const newWorkoutA = new workoutModel(workout);
      const a = await newWorkoutA.save();
    });

    it('should update the workout data', async () => {
      const result = await workoutManager.updateWorkout(workout.workoutId, { fatPercentage : 90 });
      expect(result).to.have.property('fatPercentage', 90);
    });

    it('should not update the workout data', async () => {
      try {
        const a = await workoutManager.updateWorkout('10', { fatPercentage : 90 });
      } catch (exe) {
        expect(exe).to.equal('no exist id');
      }
    });
  });

  
  // -----------------------------------------------------------------------


  describe('Delete workout', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('workouts');
      const newWorkoutA = new workoutModel(workout);
      const a = await newWorkoutA.save();
    });


    it('should delete the workout data', async () => {
      const result = await workoutManager.deleteWorkout(workout);
      expect(result).to.have.property('workoutId', '1');
    });

    it('should not update the workout data', async () => {
      const result = await workoutManager.deleteWorkout(workout);
      expect(result).to.not.exist;
    });
  });


  // -----------------------------------------------------------------------


  describe('Delete workout by id', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('workouts');
      const newWorkoutA = new workoutModel(workout);
      const a = await newWorkoutA.save();
    });


    it('should delete the workout data', async () => {
      const result = await workoutManager.deleteWorkoutById(workout.workoutId);
      expect(result).to.have.property('workoutId', '1');
    });

    it('should not update the workout data', async () => {
      const result = await workoutManager.deleteWorkoutById(workout.workoutId);
      expect(result).to.not.exist;
    });
  });  

});
