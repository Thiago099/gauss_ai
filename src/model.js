import { epsilon } from "./optmizer.js"
export class model
{
  predict(x)
  {
    return x.map(x=>predict(x,this.weights))
  }
  accuracy(x,y)
  {
    var prediction = this.predict(x)
    return accuracy(prediction,y)
  }
}

function accuracy(prediction,y)
{
  
  var correct = Array(prediction[0].length).fill(0)
  for(var i = 0; i < prediction.length; i++)
  {
    for(var j = 0; j < prediction[i].length; j++)
    {
      if(Math.abs(prediction[i][j] - y[i][j]) < epsilon)
      {
        correct[j] += 1
      }
    }
  }
  var per_output = correct.map(x=>x/prediction.length*100)
  var total = per_output.reduce((a,b)=>a+b,0) / per_output.length + "%"
  per_output = per_output.map(x=>x+"%")
  return {total,per_output}
}
export function predict(x,weights)
{
  var result = []
  for(var i = 0; i < weights.length; i++)
  {
    var sum = weights[i][x.length]
    for(var j = 0; j < x.length; j++)
    {
      sum += x[j] * weights[i][j]
    }
    sum += combination_weight_sum(x,weights[i])
    result.push(sum)
  }
  return result
}
export function sample_error(x, y, weights)
{
  var prediction = x.map(x=>predict(x,[weights]))
  var error = prediction.map((x,i)=>Math.pow(x[0] - y[i],2)).reduce((a,b)=>a+b,0)
  return error
}

function combination_weight_sum(x,weights)
{
    var wi = x.length + 1
    var result = 0
    for(var i = 0; i < x.length; i++)
    {
      result += x[i] * x[i] * weights[wi]
      wi++
    }
    for(var window = 2; window <= x.length;window++)
    {
        for(var i = 0;i<=x.length-window;i++)
        {
            var sum = 1
            for(var j = i; j < i+window ;j++)
            {
                sum *= x[j]
            }
            result += sum * weights[wi]
            wi++
        }
    }
    return result
}

export function cherry_pick(list,x,y)
{
  var result = {item:list[0],error:sample_error(x,y,list[0])}
  for(var i = 1; i < list.length; i++)
  {
    var error = sample_error(x,y,list[i])
    if(error < result.error)
    {
      result = {item:list[i],error:error}
    }
  }
  return result.item
}
