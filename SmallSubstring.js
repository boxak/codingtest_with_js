function solution(t, p) {
  var answer = 0;
  var length = p.length;
  const target = parseInt(p);
  for (let i = 0;i<=t.length - length;i++) {
    var substring = t.substring(i, i+length);
    var compare = parseInt(substring);
    if (compare <= target) {
      answer++;
    }
  }

  return answer;
}

var result = solution("500220839878", "7");
console.log(result);