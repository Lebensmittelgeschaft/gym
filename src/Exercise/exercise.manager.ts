import { exerciseModel } from './exercise.model';
import { IExercise } from './exercise.interface';
import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

export class ExerciseManager {

  public findExerciseByName(name: string) {
    try {
      return exerciseModel.findOne({ exerciseName: name });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public findAll() {
    try {
      return exerciseModel.find({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public addExercise(exercise: IExercise) {
    try {
      const newExercise = new exerciseModel(exercise);
      return newExercise.save();
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public async updateExercise(name, value: Partial<IExercise>) {
    try {
      const exercise: IExercise = <IExercise>await this.findExerciseByName(name);
      if (exercise !== null) {
        exercise.exerciseName = value.exerciseName ? value.exerciseName : exercise.exerciseName;
        exercise.muscle = value.muscle ? value.muscle : exercise.muscle;
        exercise.difficulty = value.difficulty ? value.difficulty : exercise.difficulty;
        exercise.description = value.description ? value.description : exercise.description;
        const newExercise = new exerciseModel(exercise);
        return newExercise.save();
      }
      return Promise.reject('no exist name');
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public deleteExercise(exercise: IExercise) {
    try {
      return exerciseModel.findOneAndRemove(exercise);
    } catch (exception) {
      Promise.reject(exception);
    }
  }

  public deleteExerciseByName(name: string) {
    try {
      return exerciseModel.findOneAndRemove({ exerciseName: name });
    } catch (exception) {
      Promise.reject(exception);
    }
  }

}
