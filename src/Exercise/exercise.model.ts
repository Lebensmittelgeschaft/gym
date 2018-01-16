import { IExercise } from './exercise.interface';
import { Document, Schema, Model, model, Types, SchemaTypes } from 'mongoose';


export interface IExerciseModel extends IExercise, Document {

}

const exerciseScheme: Schema = new Schema({
  exerciseName: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  muscle: {
    type: SchemaTypes.String,
    required: true,
  },
  difficulty: {
    type: SchemaTypes.Number,
    required: true,
    min: [0, 'difficulty must be in 0-5 range!'],
    max: [5, 'difficulty must be in 0-5 range!'],
  },
  description: {
    type: SchemaTypes.String,
    required: true,
  },
});

export const exerciseModel: Model<IExercise> =
  model<IExercise>('exercise', exerciseScheme);
