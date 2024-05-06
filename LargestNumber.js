function solution(numbers) {
  var answer = '';

  numbers.sort(function(a1, a2) {
    const num1 = parseInt(a1 + '' + a2);
    const num2 = parseInt(a2 + '' + a1);

    if (num1 < num2) {
      return 1;
    }

    if (num1 > num2) {
      return -1;
    }

    return 0;
  });

  numbers.forEach((number) => {
    answer = answer + number;
  });

  if (answer.startsWith('0')) {
    answer = '0';
  }

  return answer;
}