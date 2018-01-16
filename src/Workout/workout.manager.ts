import { workoutModel } from './workout.model';
import { IWorkout } from './workout.interface';
import mongoose = require('mongoose');
import { worker } from 'cluster';

mongoose.Promise = global.Promise;

export class WorkoutManager {

  public findWorkoutById(id: string) {
    try {
      return workoutModel.findOne({ workoutId: id });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public findAll() {
    try {
      return workoutModel.find({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public addWorkout(workout: IWorkout) {
    try {
      const newWorkout = new workoutModel(workout);
      return newWorkout.save();
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  public async updateWorkoutList(id, value: Partial<IWorkout>) {
    try {
      const workout: IWorkout = <IWorkout>await this.findWorkoutById(id);
      if (workout !== null) {
        workout.exercise_list = value.exercise_list ? value.exercise_list : workout.exercise_list;
        const newWorkout = new workoutModel(workout);
        return newWorkout.save();
      }
      return Promise.reject('no exist id');
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


  /*public async updateWorkoutItems(id, value: Partial<IWorkout>) {
    try {
      const workout: IWorkout = <IWorkout>await this.findWorkoutById(id);
      if (workout !== null) {
        workout.exercise_list[0].exerciseName = 
        value.exercise_list ? value.exercise_list : workout.exercise_list;
        const newWorkout = new workoutModel(workout);
        return newWorkout.save();
      }
      return Promise.reject('no exist id');
    } catch (exception) {
      return Promise.reject(exception);
    }
  }*/


  public deleteWorkout(workout: IWorkout) {
    try {
      return workoutModel.findOneAndRemove(workout);
    } catch (exception) {
      Promise.reject(exception);
    }
  }

  public deleteWorkoutById(id: string) {
    try {
      return workoutModel.findOneAndRemove({ workoutId: id });
    } catch (exception) {
      Promise.reject(exception);
    }
  }
}

