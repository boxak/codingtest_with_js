function solution(sequence, k) {
  var answer = [];
  var startIdx = 0;
  var endIdx = 0;
  var sum = sequence[0];

  if (sum === k) {
    return [0, 0];
  }

  while (endIdx < sequence.length) {
    if (sum > k) {
      while (sum > k) {
        sum -= sequence[startIdx];
        startIdx++;
      }
    } else if (sum < k) {
      endIdx++;
      if (endIdx === sequence.length) break;
      sum += sequence[endIdx];
    } else {
      if (answer.length === 2 && endIdx - startIdx < answer[1] - answer[0]) {
        answer = [startIdx, endIdx];
      }

      if (answer.length === 0) {
        answer = [startIdx, endIdx];
      }

      sum -= sequence[startIdx];
      startIdx++;
    }
  }

  return answer;
}

solution([1, 2, 3, 4, 5], 7);
