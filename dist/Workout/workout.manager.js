/*import { workoutModel } from './workout.model';
import { IWorkout } from './workout.interface';
import mongoose = require('mongoose');

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


  public async updateWorkout(id, value: Partial<IWorkout>) {
    try {
      const workout: IWorkout = <IWorkout>await this.findWorkoutById(id);
      if (workout !== null) {
        workout.workoutId = value.workoutId ? value.workoutId : workout.workoutId;
        workout.firstName = value.firstName ? value.firstName : workout.firstName;
        workout.lastName = value.lastName ? value.lastName : workout.lastName;
        workout.weight = value.weight ? value.weight : workout.weight;
        workout.height = value.height ? value.height : workout.height;
        workout.gender = value.gender ? value.gender : workout.gender;
        workout.fatPercentage = value.fatPercentage ? value.fatPercentage : workout.fatPercentage;
        const newWorkout = new workoutModel(workout);
        return newWorkout.save();
      }
      return Promise.reject('no exist id');
    } catch (exception) {
      return Promise.reject(exception);
    }
  }


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

}*/
//# sourceMappingURL=workout.manager.js.map