function solution(today, terms, privacies) {
  var answer = [];

  var termObj = {};

  const today2Int = convertDate2Int(today);

  terms.forEach(term => {
    var type = term.split(' ')[0];
    var period = parseInt(term.split(' ')[1]);
    termObj[type] = period;
  });

  for (var i = 0;i<privacies.length;i++) {
    const privacy = privacies[i];
    const collectDate = privacy.split(" ")[0];
    const type = privacy.split(" ")[1];

    const expireDate2Int = getExpireDate(collectDate, termObj[type]);
    if (expireDate2Int < today2Int) {
      answer.push(i+1);
    }
  }

  return answer;
}

function convertDate2Int(date) {
  var year = parseInt(date.split(".")[0]);
  var month = parseInt(date.split(".")[1]);
  var day = parseInt(date.split(".")[2]);

  return 12*28*year + 28*month + day;
}

function getExpireDate(collectDate, period) {
  var totalDay = convertDate2Int(collectDate);
  return totalDay + period * 28 - 1;
}

const answer = solution("2022.05.19",["A 6", "B 12", "C 3"],["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"]);

console.log("answer : ", answer);