import {cherry_pick} from './model.js'
export const epsilon = 1e-10;
function normalize(value, line) {
  for (let i = 0; i < line.length; i++) {
      line[i] /= value;
  }
}

function nullify(value, source, target) {
  for (let i = 0; i < source.length; i++) {
      target[i] -= source[i] * value;
  }
}
function gaussian_elimination(input) {
  let i = 0;
  let doneLines = [];
  while (i < input[0].length-1) {

      let minZeros = Infinity;
      let minLine = 0;
      for (let j = 0; j < input.length; j++) {
          let k;
          for (k = i; k < input[j].length-1; k++) {
              if (Math.abs(input[j][k]) > epsilon) {
                  break;
              }
          }
          if (k < minZeros && !doneLines.includes(j)) {
              minZeros = k;
              minLine = j;
          }
      }

      doneLines.push(minLine);

      
      i = minZeros;
      if (minZeros == Infinity) break;
      if (Math.abs(input[minLine][i]) < epsilon) {
        continue;
      }
      normalize(input[minLine][i], input[minLine]);
      for (let j = 0; j < input.length; j++) {
        if (j != minLine) {
          nullify(input[j][i], input[minLine], input[j]);
        }
      }
      i += 1;
    }
  }


function solve_matrix(augmented_matrix)
{
  const {result,size} = augmented_matrix
  var start = 0
  var solutions = []
  do
  {
    var piece = slice(result, start, size-1)
    gaussian_elimination(piece)
    var current_solution = piece.map(x=>x[x.length-1])
    solutions.push(current_solution)
    start += size
  }
  while(start + size <= result.length)
  return solutions
}

function generate_augmented_matrix(x,y,j)
{
  var result = []
  var size = 0
  for(var i = 0; i < x.length; i++)
  {
    // var current = [...x[i],1,y[i][j]]
    var current = [...x[i],1,...combine(x[i]),y[i][j]]
    result.push(current)
    size = current.length
  }
  return {result,size}
}

function slice(x,start,length)
{
  var result = []
  var i = start
  do
  {
    result.push([...x[i]])
    i = (i+1) % x.length
  }
  while(result.length < length)
  return result
}


function combine(x)
{
    var result = []
    for(var i = 0; i < x.length; i++)
    {
        result.push(x[i] * x[i])
    }
    for(var window = 2;window <= x.length;window++)
    {
        for(var i = 0;i<=x.length-window;i++)
        {
            var sum = 1
            for(var j = i; j < i+window ;j++)
            {
                sum *= x[j]
            }
            result.push(sum)
        }
    }

    return result
}


function calculate_weight(x,y,j)
{
  var augmented_matrix = generate_augmented_matrix(x,y,j)
  var solutions =  solve_matrix(augmented_matrix)
  return cherry_pick(solutions,x,y.map(x=>x[j]))
}

export function calculate_weights(x,y)
{
    var result = []
    for(var j = 0; j < y[0].length; j++)
    {
      result.push(calculate_weight(x,y,j))
    }
    return result
}

