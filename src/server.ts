import { IExerciseModel } from './Exercise/exercise.model';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import App from './App';
import { IWorkout } from './Workout/workout.interface';
import { IExercise } from './Exercise/exercise.interface';


const example = new App();

// let ex: IExercise = { exerciseName: 'a', muscle: "a", difficulty: 10, description: "a" };
/*const ls: Partial<IWorkout> = {
  exercise_list: [{
    exercise: 'a',
    repeat_number: 10,
    sets_number: 10,
    weights: 10,
  }],
};*/

// console.log('1', ls);

const b = {
  exercise: 'A',
  repeat_number: 10,
  sets_number: 10,
  weights: 10,
};

// const c: IWorkout = { exercise_list: [b] };

// ls.exercise_list.push(b);

// console.log('2', ls);


example.app.use(bodyParser.urlencoded({ extended: false }));
example.app.use(bodyParser.json());


example.app.get('/hello', (req, res) => {
  res.send('Hello!');
});


example.app.get('/parm', (req, res) => {
  res.send('hi ' + req.query.name);
});


