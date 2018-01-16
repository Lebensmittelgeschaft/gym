import { Document } from 'mongoose';

export interface IExercise extends Document{
  // _id : any;
  exerciseName: string;
  muscle: string;
  difficulty: number;
  description: string;
}
