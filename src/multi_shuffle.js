export function multi_shuffle(...list)
{
  var shuffle_list = transpose(list)
  shuffle_list = shuffle(shuffle_list) 
  var result_list = transpose(shuffle_list)
  return result_list
}

function transpose(list)
{
  var result = []
  for(var i = 0; i < list[0].length; i++)
  {
    var current = []
    for(var j = 0; j < list.length; j++)
    {
      current.push(list[j][i])
    }
    result.push(current)
  }
  return result
}

function shuffle(array) {
    var 
    currentIndex = array.length,
    temporaryValue,
    randomIndex,
    array = [...array];
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }