class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.rear = null;
    this.length = 0;
  }

  add(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      this.rear.next = node;
    }

    this.rear = node;
    this.length++;
  }

  pop() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
    this.length--;
  }

  peek() {
    return this.head?.data;
  }

  isEmpty() {
    return this.length === 0;
  }
}

function solution(sales, links) {
  var answer = 0;

  var staffInfoList = [];
  var teamData = {};
  var selected = {};
  var selectedMemberSet = new Set();

  for (let i = 0; i < sales.length; i++) {
    const id = i + 1;
    staffInfoList.push({
      id: id,
      sale: sales[i],
      team: null,
    });
  }

  links.forEach((link) => {
    const leader = link[0];
    const member = link[1];

    if (!staffInfoList[member - 1].team) {
      staffInfoList[member - 1].team = ["team_" + leader];
    } else if (staffInfoList[member - 1].team[0] !== "team_" + leader) {
      staffInfoList[member - 1].team.push("team_" + leader);
    }

    if (!staffInfoList[leader - 1].team) {
      staffInfoList[leader - 1].team = ["team_" + leader];
    } else if (staffInfoList[leader - 1].team[0] !== "team_" + leader) {
      staffInfoList[leader - 1].team.push("team_" + leader);
    }

    if (!teamData["team_" + leader]) {
      teamData["team_" + leader] = {
        leader: leader,
        members: [leader, member],
      };
    } else {
      teamData["team_" + leader].members.push(member);
    }
  });

  Object.keys(teamData).forEach((teamName) => {
    const team = teamData[teamName];
    if (team.members) {
      team.members.sort((m1, m2) => {
        const info1 = staffInfoList[m1 - 1];
        const info2 = staffInfoList[m2 - 1];

        if (info1.sale > info2.sale) {
          return 1;
        } else if (info1.sale < info2.sale) {
          return -1;
        }

        return 0;
      });
    }
  });

  var que = new Queue();
  que.add(1);

  while (!que.isEmpty()) {
    const leader = que.peek();
    const teamName = "team_" + leader;

    const members = teamData[teamName] ? teamData[teamName].members : [];

    que.pop();

    let minValue = Number.MAX_SAFE_INTEGER;
    let minMemberId = members.length > 0 ? members[0] : leader;

    members.forEach((member) => {
      const minSaleTeamMember1 = teamData[teamName].members[0];
      let minSaleTeamMember2 = teamData[teamName].members[0];
      if (member !== leader && teamData["team_" + member]) {
        que.add(member);

        const team1 = teamName;
        const team2 =
          staffInfoList[member - 1].team[0] === teamName
            ? staffInfoList[member - 1].team[1]
            : staffInfoList[member - 1].team[0];

        minSaleTeamMember2 = teamData[team2].members[0];

        let diff = Number.MAX_SAFE_INTEGER;

        if (team1 !== team2) {
          diff =
            staffInfoList[member - 1].sale -
            staffInfoList[minSaleTeamMember1 - 1].sale -
            staffInfoList[minSaleTeamMember2 - 1].sale;
        }

        if (diff < minValue) {
          minValue = diff;
          minMemberId = member;
        }
      }
    });

    if (!selectedMemberSet.has(leader)) {
      selectedMemberSet.add(minMemberId);
    }
  }

  console.log(JSON.stringify(staffInfoList));
  console.log(JSON.stringify(teamData));
  console.log(selectedMemberSet);

  for (const selectedMember of selectedMemberSet) {
    answer += staffInfoList[selectedMember - 1].sale;
  }

  console.log("answer : " + answer);

  return answer;
}

var sales = [5, 6, 5, 1, 4];
var links = [
  [2, 3],
  [1, 4],
  [2, 5],
  [1, 2],
];

solution(sales, links);
