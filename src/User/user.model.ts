import { IUser } from './user.interface';
import { Schema, Model, model, Types, SchemaTypes } from 'mongoose';

const userScheme: Schema = new Schema({
  userId: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  firstName: {
    type: SchemaTypes.String,
    required: true,
  },
  lastName: {
    type: SchemaTypes.String,
    required: true,
  },
  weight: {
    type: SchemaTypes.Number,
    required: true,
    min: [0, 'weight must be positive!'],
  },
  height: {
    type: SchemaTypes.Number,
    required: true,
    min: [0, 'height must be positive!'],
  },
  gender: {
    type: SchemaTypes.String,
    required: true,
    enum: {
      values: ['male', 'female'],
      message: '`{VALUE}` is invalid. You must enter male or female',
    },
  },
  fatPercentage: {
    type: SchemaTypes.Number,
    required: true,
    min: [0, 'fat percentage must be in 0-100 range!'],
    max: [100, 'fat percentage must be in 0-100 range!'],
  },
});

export const userModel: Model<IUser> = model<IUser>('user', userScheme);
