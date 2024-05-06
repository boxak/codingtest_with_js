class Node {
  constructor(idx, x, y) {
    this.idx = idx;
    this.x = x;
    this.y = y;

    this.left = null;
    this.right= null;
    this.parent = null;
  }
}

function solution(nodeinfo) {
  var answer = [[]];

  var nodeList = [];

  for (let i = 0;i<nodeinfo.length; i++) {
    const idx = i+1;
    const x = nodeinfo[i][0];
    const y = nodeinfo[i][1];

    nodeList.push(new Node(idx, x, y));
  }

  nodeList.sort((a, b) => {
    if (a.x > b.x) {
      return 1;
    } else if (a.x < b.x) {
      return -1;
    }

    return 0;
  });

  for (let i = 0;i<nodeList.length; i++) {
    const node = nodeList[i];
    const idx = node.idx;
    const x = node.x;
    const y = node.y;
    const left = node.left;
    const right = node.right;
    const parent = node.parent;

    for (let j = i + 1;j<nodeList.length; j++) {
      const otherY = nodeList[j].y;

      if (otherY > y) {
        if (!nodeList[j].left) {
          nodeList[i].parent = nodeList[j].idx;
          nodeList[j].left = idx;
        }
        break;
      }
    }
  }

  for (let i = nodeList.length - 1;i>=0; i--) {
    const node = nodeList[i];
    const idx = node.idx;
    const x = node.x;
    const y = node.y;
    const left = node.left;
    const right = node.right;
    const parent = node.parent;

    for (let j = i - 1;j >= 0; j--) {
      const otherY = nodeList[j].y;

      if (otherY > y) {
        if (!nodeList[j].right) {
          nodeList[i].parent = nodeList[j].idx;
          nodeList[j].right = idx;
        }
        break;
      }
    }
  }

  

  return answer;
}

var array = [[5,3],[11,5],[13,3],[3,5],[6,1],[1,3],[8,6],[7,2],[2,2]];

solution(array);