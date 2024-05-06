let temp_course = [];
let course = [];
let finish = false;

function solution(tickets) {
  var answer = [];

  var graph = {};
  var numOfTicket = tickets.length;

  tickets.forEach((ticket) => {
    const port1 = ticket[0];
    const port2 = ticket[1];

    if (graph[port1] === undefined) {
      graph[port1] = [];
    }

    graph[port1].push({
      to : port2,
      used : false
    });

  });

  Object.keys(graph).forEach((key) => {
    graph[key].sort((a, b) => {
      const p1 = a.to;
      const p2 = b.to;

      if (p1 > p2) {
        return 1;
      } else if (p1 < p2) {
        return -1;
      }
      return 0;
    });
  });

  dfs(graph, "ICN", 0, numOfTicket);

  answer = course;

  return answer;
}

function dfs(graph, port, usedCount, numOfTicket) {

  if (finish === true) {
    return;
  }

  temp_course.push(port);
  
  if (usedCount === numOfTicket) {
    temp_course.forEach((element) => {
      course.push(element);
    });
    finish = true;
    return;
  }

  const array = graph[port];

  if (array) {

    for (let i = 0;i<array.length; i++) {
      const ticketInfo = array[i];

      const nextPort = ticketInfo.to;
      const used = ticketInfo.used;

      if (used === false) {
        ticketInfo.used = true;
        dfs(graph, nextPort, usedCount + 1, numOfTicket);
        ticketInfo.used = false;
      }
    }
  }

  if (temp_course.length > 0) {
    temp_course.pop();
  }

}