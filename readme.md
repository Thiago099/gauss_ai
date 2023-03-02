# Gauss optimizer

this is a single layer neural network that can solve a variety of math problems.

it is powered by gauss elimination, that solves the following type of equations,
that happens to be the equation for a single layer neural network

x1 * W1 + x2 * W2 + 1 * B = y1
x1 * W1 + x2 * W2 + 1 * B = y2
y1 * W1 + y2 * W2 + 1 * B = y3


it tactually have some hacks that i used to make it able to do multiplication as well

here is a example:

```
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
```

that have the following output:
[ [ 28 ], [ 16 ], [ 9 ] ]
{ total: '100%', per_output: [ '100%' ] }
