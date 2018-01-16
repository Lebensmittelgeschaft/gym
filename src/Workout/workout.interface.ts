import { IExercise } from '../Exercise/exercise.interface';
import { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  workoutId : string;
  exerciseList: [{
    exerciseName: string; // unique name- from exercises
    repeatNumber: number;
    setsNumber: number;
    weights: number;
  }];
}
