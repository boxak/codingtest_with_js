function solution(plans) {
  var answer = [];
  var stack = [];

  var doingJob = false;
  var obj = {};
  var index = 0;

  plans.forEach((plan) => {
    var playtime = plan[1];
    var hour = parseInt(playtime.split(":")[0]);
    var minute = parseInt(playtime.split(":")[1]);

    plan[1] = 60 * hour + minute;
  });

  plans.sort((plan1, plan2) => {
    return plan1[1] - plan2[1];
  });

  for (var i = 0; i < 24 * 60; i++) {
    if (obj.playtime === 0) {
      answer.push(obj.name);
      obj = {};
      if (stack.length > 0) {
        if (!(index < plans.length && i === plans[index][1])) {
          var size = stack.length;
          obj = {
            name: stack[size - 1].name,
            start: stack[size - 1].start,
            playtime: stack[size - 1].playtime,
          };
          stack.pop();
        }
      }
    }

    // 시작할 과제가 존재하면
    if (index < plans.length && i === plans[index][1]) {
      // 지금 하던 일이 있다면
      if (Object.keys(obj).length > 0) {
        stack.push({
          name: obj.name,
          start: obj.start,
          playtime: obj.playtime,
        });
      }

      obj = {
        name: plans[index][0],
        start: plans[index][1],
        playtime: plans[index][2],
      };
      index++;
    }

    if (obj.playtime) {
      obj.playtime--;
    }
  }

  return answer;
}

function setObj(obj, plan) {
  obj = { name: plan[0], start: plan[1], playtime: plan[2] };
  return obj;
}

var params = [
  ["korean", "11:40", "1"],
  ["english", "11:41", "10"],
  ["math", "11:51", "10"],
  ["science", "11:56", "5"],
  ["physics", "12:01", "10"]
];

// korean, english, science, physisc, math

var answer = solution(params);

console.log(answer);
