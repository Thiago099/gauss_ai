import { network } from './src/network.js';
console.clear();

const x = [
    [1,2,1],
    [2,3,2],
    [3,5,3],
    [4,7,5],
    [5,11,4],
    [6,13,8],
    [7,17,9],
    [8,19,10],
    [9,23,12],
    [10,29,13],
    [11,31,15],
    [12,37,17],
    [13,41,19],
    [14,43,21],
    [15,47,23],
]
const x_test = [
    [100,30,4],
    [200,60,8],
]

function parse(x){
    return x.map((x)=>[x[0]*x[1]+x[2]])
}

const y = parse(x)

const y_test = parse(x_test)

const model = network(x,y, 100)

console.log(model.predict(x_test))
console.log(y_test)
console.log(model.accuracy(x_test,y_test))