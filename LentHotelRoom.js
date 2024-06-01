function makeSortedBookInfoOnMinuteUnit(book_time) {
  var sorted = [];

  function convertHHmmToMinute(time) {
    const [hour, min] = time.split(":").map((str) => parseInt(str));

    return hour * 60 + min;
  }

  return function () {
    book_time.forEach((book) => {
      // var start =
      //   60 * parseInt(book[0].split(":")[0]) + parseInt(book[0].split(":")[1]);
      // var end =
      //   60 * parseInt(book[1].split(":")[0]) + parseInt(book[1].split(":")[1]);

      const [start, end] = book.map((time) => convertHHmmToMinute(time));

      sorted.push({
        start: start,
        end: end,
      });
    });

    sorted.sort((a, b) => a.start - b.start);

    return sorted;
  };
}

function solution(book_time) {
  var answer = 0;
  var lentals = [];

  var sorted = makeSortedBookInfoOnMinuteUnit(book_time)();

  answer = 1;

  lentals.push(0);

  for (var i = 1; i < sorted.length; i++) {
    const start = sorted[i].start;
    const end = sorted[i].end;
    const nOfLentals = lentals.length;
    let findRoom = false;
    for (var j = 0; j < nOfLentals; j++) {
      const startOfPrev = sorted[lentals[j]].start;
      const endOfPrev = sorted[lentals[j]].end;
      if (endOfPrev + 10 <= start) {
        lentals[j] = i;
        findRoom = true;
        break;
      }
    }
    if (findRoom === false) {
      lentals.push(i);
      answer++;
    }
  }

  return answer;
}

var array = [
  ["15:00", "17:00"],
  ["16:40", "18:20"],
  ["14:20", "15:20"],
  ["14:10", "19:20"],
  ["18:20", "21:20"],
];

console.log(solution(array));
