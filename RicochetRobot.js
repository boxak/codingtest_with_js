var visited = [];
var n = -1; // length of rows
var m = -1; // length of columns
const dr = [-1,0,1,0];
const dc = [0,1,0,-1];
var minValue = 1000000000;

function solution(board) {
    var answer = 0;
    
    n = board.length;
    m = board[0].length;
    
    var initPosition = [-1,-1];
    
    for (var i = 0;i<n;i++) {
        var temp2 = [];
        for (var j = 0;j<m;j++) {
            var temp1 = [];
            for (var k = 0;k<4;k++) {
                temp1.push(minValue);
            }
            
            if (board[i][j] === 'R') {
                initPosition[0] = i;
                initPosition[1] = j;
            }
            
            temp2.push(temp1);
        }
        visited.push(temp2);
    }
    
    // console.log("visited : " + JSON.stringify(visited));
    
    dfs(board, initPosition[0], initPosition[1], 0, 1);
    dfs(board, initPosition[0], initPosition[1], 1, 1);
    dfs(board, initPosition[0], initPosition[1], 2, 1);
    dfs(board, initPosition[0], initPosition[1], 3, 1);

    answer = minValue;

    console.log(answer);
    
    return answer === 1000000000 ? -1 : answer;
}


function dfs(board, r, c, d, count) {
  // console.log(r, c, d, count);

  // if (r === 0 && c === 2 && d === 3) {
  //   console.log("zzzz");
  // }

  if (r < 0 || r >= n || c < 0 || c >= m || board[r][c] === "D") {
    return;
  }

  if (count > visited[r][c][d]) {
    return;
  }

  if (board[r][c] === "G") {
    if (minValue > count - 1) {
      minValue = count - 1;
    }
  }

  visited[r][c][d] = count;

  for (let i = 1; i <= n; i++) {
    let nr = r + i * dr[d];
    let nc = c + i * dc[d];

    if (nr >= 0 && nr < n && nc >= 0 && nc < m && visited[nr][nc][d] < count) {
      return;
    }

    if (nr < 0 || nr >= n || nc < 0 || nc >= m || board[nr][nc] === "D") {
      if (i >= 2) {
        dfs(board, r + (i - 1) * dr[d], c + (i - 1) * dc[d], 0, count + 1);
        dfs(board, r + (i - 1) * dr[d], c + (i - 1) * dc[d], 1, count + 1);
        dfs(board, r + (i - 1) * dr[d], c + (i - 1) * dc[d], 2, count + 1);
        dfs(board, r + (i - 1) * dr[d], c + (i - 1) * dc[d], 3, count + 1);
      }
      break;
    }
  }
}

var board = ["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."];

solution(board);