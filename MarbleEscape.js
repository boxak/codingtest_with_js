const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().trim().split("\n");

const n = parseInt(input[0].split(' ')[0]);
const m = parseInt(input[0].split(' ')[1]);

const map = input.slice(1);
// console.log("map : " + JSON.stringify(map));
const array = [0,0,0,0,0,0,0,0,0,0];
const dr = [-1,0,1,0];
const dc = [0,1,0,-1];
var redR = 0;
var redC = 0;
var blueR = 0;
var blueC = 0;
var count = 100;
var r1 = 0;
var c1 = 0;
var r2 = 0;
var c2 = 0;
var redInHole = false;
var blueInHole = false;

for (let i = 0;i<n;i++) {
  for (let j = 0;j<m;j++) {
    if (map[i][j] === 'R') {
      redR = i;
      redC = j;
    } else if (map[i][j] === 'B') {
      blueR = i;
      blueC = j;
    }
  }
}

function dfs(x) {
  if (x === 10) {
    simulation();
    return;
  }

  for (let i = 0;i<4;i++) {
    array[x] = i;
    dfs(x+1);
  }
}

function moveRed(d) {
  var nr = r1 + dr[d];
  var nc = c1 + dc[d];
  if (map[nr][nc] !== '#' && !(nr === r2 && nc === c2)) {
    r1 = nr;
    c1 = nc;
    if (map[r1][c1] === 'O') {
      redInHole = true;
    }
  }
}

function moveBlue(d) {
  var nr = r2 + dr[d];
  var nc = c2 + dc[d];
  if (map[nr][nc] !== '#' && !(nr === r1 && nc === c1 && map[r1][c1] !== 'O')) {
    r2 = nr;
    c2 = nc;
    if (map[r2][c2] === 'O') {
      blueInHole = true;
    }
  }
}

function simulation() {

  r1 = redR;
  c1 = redC;
  r2 = blueR;
  c2 = blueC;
  redInHole = false;
  blueInHole = false;
  for (let i = 0;i<10;i++) {
    const d = array[i];
    for (let j = 0;j<10;j++) {
      moveRed(d);
      moveBlue(d);
    }
    if (redInHole === true && blueInHole === false) {
      count = Math.min(count, i+1);
      break;
    }
  }

}

dfs(0);
if (count === 100) {
  console.log(-1);
}
else console.log(count);