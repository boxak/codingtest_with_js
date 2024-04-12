class Queue {
  constructor() {
    this.array = [];
    this.head = 0;
    this.tail = 0;
  }

  add(element) {
    if (!this.array) {
      return;
    }

    this.array.push(element);
    this.head++;
  }

  pop() {
    if (this.isEmpty()) {
      return;
    }

    this.tail++;
  }

  getHead() {
    if (!this.isEmpty()) {
      return undefined;
    }

    return this.array[this.head];
  }

  getTail() {
    if (!this.isEmpty()) {
      return undefined;
    }

    return this.array[this.tail];
  }

  isEmpty() {
    return !this.array || this.head === this.tail;
  }
}

function solution(arr) {
  var que = new Queue();
  var array = [];

  for (let i = 0; i < arr.length; i++) {
    if (que.isEmpty()) {
      que.add(arr[i]);
      array.push(arr[i]);
    } else {
      let head = que.getHead();

      if (head !== arr[i]) {
        que.add(arr[i]);
        array.push(arr[i]);
      }
    }
  }

  return array;
}
