function solution(data, col, row_begin, row_end) {
  var answer = 0;

  data.sort(function(tuple1, tuple2) {
    if (tuple1[col-1] === tuple2[col-1]) {
      return tuple2[0] - tuple1[0];
    }
    return tuple1[col-1] - tuple2[col-1];
  });

  var sArray = [];

  for (var i = row_begin-1;i<=row_end-1;i++) {
    const tuple = data[i];
    var sum = 0;
    for (var j = 0;j<tuple.length;j++) {
      sum+=tuple[j]%(i+1);
    }
    sArray.push(sum);
  }

  if (sArray.length === 1) {
    return sArray[0];
  } else if (sArray.length > 1) {
    var result = sArray[0] ^ sArray[1];
    for (var i = 2;i<sArray.length;i++) {
      result = result ^ sArray[i];
    }
    answer = result;
  }

  return answer;
}

var answer = solution([[2,2,6],[1,5,10],[4,2,9],[3,8,3]],2,2,3);
console.log("Answer : " + answer);

