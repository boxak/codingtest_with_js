
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

function solution(n, edge) {
  var answer = 0;

  let vector = [];
  
  for (let i = 0; i<=n; i++) {
    vector.push([]);
  }

  for (let i = 0;i<edge.length;i++) {
    const a = edge[i][0];
    const b = edge[i][1];

    vector[a].push(b);
    vector[b].push(a);
  }

  answer = bfs(n, vector);

  return answer;
}

function bfs(n, vector) {
  let que = new Queue();
  let visited = new Array(n+1).fill(false);
  let dist = new Array(n+1).fill(0);

  visited[1] = true;
  que.add([1, 0]);

  while(!que.isEmpty()) {
    const node = que.peek();

    const idx = node[0];
    const d = node[1];

    dist[idx] = d;

    que.pop();

    for (let i = 0;i<vector[idx].length; i++) {
      const next = vector[idx][i];

      if (visited[next] === false) {
        visited[next] = true;
        que.add([next, d+1]);
      }
    }

  }

  let maxDist = -1;

  for (let i = 0;i<dist.length;i++) {
    if (maxDist < dist[i]) {
      maxDist = dist[i];
    }
  }

  let cnt = 0;

  for (let i = 0;i<dist.length;i++) {
    if (dist[i] === maxDist) {
      cnt++;
    }
  }

  return cnt;

}