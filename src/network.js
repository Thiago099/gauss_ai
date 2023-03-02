import { model } from './model.js'
import { calculate_weights } from './optmizer.js'
import { multi_shuffle } from './multi_shuffle.js'
import { cherry_pick } from './model.js'

export function network(x, y, epochs = 100)
{
    var result = new model(x,y)
    var weight_list = []
    for(var i = 0; i < epochs; i++)
    {
      weight_list.push(train_epoch(x,y))
    }
    result.weights = pick_best_results(weight_list,x,y)
    return result
}
function train_epoch(x,y)
{
  const [xx,yy] = multi_shuffle(x,y)
  return calculate_weights(xx,yy)
}
function pick_best_results(weight_list,x,y)
{
  var weights = []
  for(var j = 0; j < weight_list[0].length; j++)
  {
    var weight_sample = []
    for(var i = 0; i < weight_list.length; i++)
    {
      weight_sample.push(weight_list[i][j])
    }
    weights.push(cherry_pick(weight_sample,x,y.map(x=>x[j])))
  }
  return weights
}


