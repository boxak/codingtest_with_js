const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim();

const N = parseInt(input.split("\n")[0]);

let board = [];
let copy = [];
let maxValue = 0;
const dr = [-1,0,1,0];
const dc = [0,1,0,-1];

for (let i = 0;i<N;i++) {
  const row = input.split("\n").splice(1)[i];
  const newRow = [];
  for (let j = 0;j<N;j++) {
    newRow.push(parseInt(row.split(" ")[j]));
  }
  board.push(newRow);
}

for (let a = 0;a<4;a++) {
  for (let b = 0;b<4;b++) {
    for (let c = 0;c<4;c++) {
      for (let d = 0;d<4;d++) {
        for (let e = 0;e<4;e++) {
          makeCopy();
          move(a);
          move(b);
          move(c);
          move(d);
          move(e);
          getMaxValue();
        }
      }
    }
  }
}

function makeCopy() {
  copy = [];
  for (let i = 0;i<N;i++) {
    let row = [];
    for (let j = 0;j<N;j++) {
      row.push(board[i][j]);
    }
    copy.push(row);
  }
}

console.log(board);