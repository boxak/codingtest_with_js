function solution(sizes) {
  var answer = 0;

  var maxArea = 0;
  var maxLength = 0;
  var other_length = 0;

  sizes.forEach(size => {
    const a1 = size[0];
    const a2 = size[1];
    if (Math.max(a1, a2) > maxLength) {
      maxLength = Math.max(a1, a2);
      other_length = Math.min(a1, a2);
    }
  });

  sizes.forEach(size => {
    const a1 = size[0];
    const a2 = size[1];

    if (a1 > other_length) {
      if (a2 > other_length) {
        other_length = Math.min(a1, a2);
      }
    }

  });

  answer = maxLength * other_length;

  return answer;
}

var result = solution([[60, 50], [30, 70], [60, 30], [80, 40]]);
console.log("answer : " + result);