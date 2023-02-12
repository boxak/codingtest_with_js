function solution(scores) {
  var answer = 0;

  var array = [];
  var wanho = scores[0];

  for (var i = 0;i<scores.length;i++) {
    array[i] = {'score1' : scores[i][0], 'score2' : scores[i][1], 'index' : i};
  }

  var sortedArray1 = array.sort(function(s1, s2) {
    
    if (s1.score1 === s2.score1) {
      return s2.score2 - s1.score2;
    } else {
      return s2.score1 - s1.score1;
    }

  });

  for (var i = 0;i<sortedArray1.length;i++) {
    sortedArray1[i].index2 = i;
  }

  var tempArray = [];

  sortedArray1.forEach(element => {
    tempArray.push(element);
  });

  var sortedArray2 = sortedArray1.sort(function(s1, s2) {
    
    if (s1.score2 === s2.score2) {
      return s2.score1 - s1.score1;
    } else {
      return s2.score2 - s1.score2;
    }

  });

  for (var i = 0;i<sortedArray2.length;i++) {
    sortedArray2[i].index3 = i;
  }

  var boolArray = [];

  for (var i = 0;i<scores.length;i++) {
    boolArray.push(false);
  }

  for (var i = 0;i<sortedArray1.length;i++) {
    
  }

  return answer;
}