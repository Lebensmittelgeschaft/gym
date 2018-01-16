import { ExerciseManager } from './exercise.manager';
import { expect } from 'chai';
import { IExercise } from './exercise.interface';
import { config } from '../config';
import { exerciseModel } from './exercise.model';
import mongoose = require('mongoose');

const exerciseManager = new ExerciseManager();

const exercise: IExercise = <IExercise>{
  exerciseName: '1',
  muscle: 'chest',
  difficulty: 4,
  description: '123',
};


const exercise2: IExercise = <IExercise>{
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

    it('should add a new exercise',async () => {
      const result = await exerciseManager.addExercise(exercise);
      expect(result).to.have.property('_id');
    });

    it('should return empty object',async () => {
      try {
        const a = await exerciseManager.addExercise(exercise);
      } catch (exe) {
        expect(exe).to.have.property('name', 'MongoError');
      }
    });

  });

  // -----------------------------------------------------------------------
  
  describe('Find Exercise by Name', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('exercises');
      const newExercise = new exerciseModel(exercise);
      const a = await newExercise.save();
    });

    it('should find a exercise by id', async () => {
      const result = await exerciseManager.findExerciseByName(exercise.exerciseName);
      expect(result).to.have.property('exerciseName', '1');
    });

    it('should return empty object', async () => {
      const result = await exerciseManager.findExerciseByName('2');
      expect(result).to.not.exist;
    });

    // no exercises in the db:
    it('should return exception', async () => {
      await mongoose.connection.db.dropCollection('exercises');
      const result = await exerciseManager.findExerciseByName('2');
      expect(result).to.not.exist;
    });

  });


  // -----------------------------------------------------------------------


  describe('Find All Exercises', () => {

    before(async () => {
      // mongoose.connection.db.dropCollection('exercises');
      const newExerciseA = new exerciseModel(exercise);
      const a = await newExerciseA.save();
      const newExerciseB = new exerciseModel(exercise2);
      const b = await newExerciseB.save();
    });

    it('should find all exercises', async () => {
      const result = await exerciseManager.findAll();
      const firstExercise = result[0];
      const secondExercise = result[1];
      expect(firstExercise).to.have.property('exerciseName', '1');
      expect(secondExercise).to.have.property('exerciseName', '2');
    });

    it('should return empty object', async () => {
      const result = await exerciseManager.findExerciseByName('3');
      expect(result).to.not.exist;
    });

    // no exercises in the db:
    it('should return exception', async () => {
      await mongoose.connection.db.dropCollection('exercises');
      const result = await exerciseManager.findExerciseByName('2');
      expect(result).to.not.exist;
    });

  });

  // -----------------------------------------------------------------------


  describe('Update exercise', () => {

    before(async () => {
      // mongoose.connection.db.dropCollection('exercises');
      const newExerciseA = new exerciseModel(exercise);
      const a = await newExerciseA.save();
    });

    it('should update the exercise data', async () => {
      const result = await exerciseManager.
        updateExercise(exercise.exerciseName, { muscle : 'legs' });
      expect(result).to.have.property('muscle', 'legs');
    });

    it('should update the exercise data', async () => {
      const result = await exerciseManager.
        updateExercise(exercise.exerciseName, { muscle : 'legs' , description: '456' });
      expect(result).to.have.property('muscle', 'legs');
      expect(result).to.have.property('description', '456');
    });

    it('should not update the exercise data', async () => {
      try {
        const a = await exerciseManager.updateExercise('10', { muscle : 'legs' });
      } catch (exe) {
        expect(exe).to.equal('no exist name');
      }
    });
  });

  
  // -----------------------------------------------------------------------


  describe('Delete exercise', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('exercises');
      const newExerciseA = new exerciseModel(exercise);
      const a = await newExerciseA.save();
    });


    it('should delete the exercise data', async () => {
      const result = await exerciseManager.deleteExercise(exercise);
      expect(result).to.have.property('exerciseName', '1');
    });

    it('should not update the exercise data', async () => {
      const result = await exerciseManager.deleteExercise(exercise);
      expect(result).to.not.exist;
    });
  });


  // -----------------------------------------------------------------------


  describe('Delete exercise by id', () => {

    before(async () => {
      await mongoose.connection.db.dropCollection('exercises');
      const newExerciseA = new exerciseModel(exercise);
      const a = await newExerciseA.save();
    });


    it('should delete the exercise data', async () => {
      const result = await exerciseManager.deleteExerciseByName(exercise.exerciseName);
      expect(result).to.have.property('exerciseName', '1');
    });

    it('should not update the exercise data', async () => {
      const result = await exerciseManager.deleteExerciseByName(exercise.exerciseName);
      expect(result).to.not.exist;
    });
  });  

});
