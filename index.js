import { network } from './src/network.js';
console.clear();

const x = [
    [1,2],
    [2,3],
    [3,5],
    [4,7],
    [5,11],
    [6,13],
]

const y = [
    [2],
    [6],
    [15],
    [28],
    [55],
    [78],
]

const model = network(x,y, 100)

const x_test = [
    [7,4],
    [8,2],
    [9,1],
]

const y_test = [
    [28],
    [16],
    [9],
]

console.log(model.predict(x_test))
console.log(model.accuracy(x_test,y_test))