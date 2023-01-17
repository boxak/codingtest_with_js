var result = [];
var answer = [];
var flag = false;

function solution(tickets) {

  var ticketData = {};

  tickets.sort(function(t1, t2) {
    const s1 = t1[0];
    const e1 = t1[1];
    const s2 = t2[0];
    const e2 = t2[1];

    if (s1 === s2) {
      return e1 < e2 ? -1 : 1;
    } else return s1 > s2 ? -1 : 1;
  });

  tickets.forEach(ticket => {
    const departure = ticket[0];
    const destination = ticket[1];

    if (!ticketData[departure]) {
      ticketData[departure] = [];
    } 
    
    ticketData[departure].push({
      "to" : destination,
      "use" : false
    });
    
  });

  result.push("ICN");
  dfs(ticketData, "ICN", tickets.length, 0);

  return answer;
}

function dfs(ticketData, airport, ticketCount, useCount) {
  if (flag) {
    return;
  }
  if (useCount === ticketCount) {
    result.forEach(element => {
      answer.push(element);
    });
    flag = true;
    return;
  }

  var arr = ticketData[airport];
  if (arr !== undefined && arr !== []) {
    for (var i = 0;i<arr.length;i++) {
      var next = arr[i].to;
      var use = arr[i].use;

      if (use === false) {
        result.push(next);
        ticketData[airport][i].use = true;
        dfs(ticketData, next, ticketCount, useCount+1);
        result.pop();
        ticketData[airport][i].use = false;
      }
    }
  }
}

var list = solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"], ["SFO", "ICN"], ["ICN", "SFO"]]);
console.log(list);