class Queue {
  constructor() {
      this.arr = [];
      this.front = 0;
      this.end = 0;
  }
  
  add(element) {
      this.arr[this.end++] = element;
  }
  
  pop() {
      this.front++;
  }
  
  head() {
      return this.arr[this.front];
  }

  tail() {
    return this.arr[this.end-1];
  }
  
  size() {
      return this.end - this.front;
  }
  
  getArray() {
      return this.arr.slice(this.front, this.end);
  }
}

function solution(arr) {
    var answer = [];

    var que = new Queue();

    que.add(arr[0]);

    for (let i = 1;i<arr.length;i++) {
      const number = arr[i];
      if (number !== que.tail()) {
        que.add(number);
      }
    }
    
    while(que.size() > 0) {
      answer.push(que.head());
      que.pop();
    }

    return answer;
}

var answer = solution([1,1,3,3,0,1,1]);
console.log(answer);