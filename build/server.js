"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const App_1 = require("./App");
const example = new App_1.default();
// let ex: IExercise = { exerciseName: 'a', muscle: "a", difficulty: 10, description: "a" };
const ls = {
    exercise_list: [{
            exercise: 'a',
            repeat_number: 10,
            sets_number: 10,
            weights: 10,
        }],
};
console.log('1', ls);
const b = {
    exercise: 'A',
    repeat_number: 10,
    sets_number: 10,
    weights: 10,
};
const c = { exercise_list: [b] };
ls.exercise_list.push(b);
console.log('2', ls);
example.app.use(bodyParser.urlencoded({ extended: false }));
example.app.use(bodyParser.json());
example.app.get('/hello', (req, res) => {
    res.send('Hello!');
});
example.app.get('/parm', (req, res) => {
    res.send('hi ' + req.query.name);
});
//# sourceMappingURL=server.js.map