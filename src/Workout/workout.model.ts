import { IWorkout } from './workout.interface';
import { Document, Schema, Model, model, Types, SchemaTypes } from 'mongoose';

const workoutScheme: Schema = new Schema({
  exerciseList: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref:'exercise',
  }, 
});

export const workoutModel: Model<IWorkout> = model<IWorkout>('workout', workoutScheme);
