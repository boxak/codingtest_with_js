const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim();

const array = JSON.parse(input);

const returnVal = solution(array);

// console.log(returnVal);

function solution(scores) {
  var answer = 0;

  var wanho = scores[0];
  var wanhoSum = scores[0][0] + scores[0][1];

  var array1 = [];
  var array2 = [];

  scores.forEach((score, index) => {
    array1.push([score[0], score[1], index]);
    array2.push([score[0], score[1], index]);
  });

  array1.sort((a1, a2) => {
    if (a1[0] === a2[0]) {
      return a2[1] - a1[1];
    } else {
      return a2[0] - a1[0];
    }
  });

  array2.sort((a1, a2) => {
    if (a1[1] === a2[1]) {
      return a2[0] - a1[0];
    } else {
      return a2[1] - a1[1];
    }
  });

  // console.log(array1);
  // console.log(array2);

  var max1 = array1[0][1];
  var value1 = array1[0][0];
  var max2 = array2[0][0];
  var value2 = array2[0][1];

  var checkArr = [];

  scores.forEach(score => checkArr.push(true));

  for (var i = 1;i<array1.length;i++) {
    var val1 = array1[i][1];
    var val2 = array1[i][0];
    if (val1 > max1) {
      max1 = val1;
      value1 = val2;
    }

    else if (val1 < max1 && val2 < value1) {
      checkArr[array1[i][2]] = false;
    }
  }

  for (var i = 1;i<array2.length;i++) {
    var val1 = array2[i][0];
    var val2 = array2[i][1];
    if (val1 > max2) {
      max2 = val1;
      value2 = val2;
    }

    else if (val1 < max2 && val2 < value2) {
      checkArr[array2[i][2]] = false;
    }
  }


  var filterdArray = scores.filter((score, index) => checkArr[index]);

  console.log(filterdArray);

  filterdArray.sort((a1, a2) => {
    var sum1 = a1[0] + a1[1];
    var sum2 = a2[0] + a2[1];

    return sum2 - sum1;
  });

  var cnt = 0;
  var flag = false;
  var flag2 = false;

  for (var i = 0;i<filterdArray.length;i++) {
    var sum = filterdArray[i][0] + filterdArray[i][1];

    if (filterdArray[i][0] === wanho[0] && filterdArray[i][1] === wanho[1]) {
      flag2 = true;
    }

    if (sum > wanhoSum) {
      cnt++;
    } else if (sum == wanhoSum && !flag) {
      cnt++;
      flag = true;
    }
  }

  if (flag2) {

    answer = cnt;
  } else {
    answer = -1;
  }

  return answer;
}