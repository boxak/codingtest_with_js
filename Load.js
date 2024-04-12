/////////////////////////////////////////////////////////////////////////////////////////////
// 일부 테스트케이스의 마지막에 개행 문자(\n)가 포함되어 있을 수 있습니다.
// 따라서, 예상치 못한 오답 처리를 방지하기 위해서
// fs모듈을 사용하여 입력을 받을 땐, **반드시** trim()을 사용하여 여백을 제거 하거나
// readline 모듈을 통해 입력을 받으시길 바랍니다.
// 해당 내용을 숙지 하셨다면, 주석을 지우고 문제풀이를 하셔도 무방합니다.
/////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().trim().split("\n");

let answer = 0;

const vCnt = parseInt(input[0].split(' ')[0]);
const eCnt = parseInt(input[0].split(' ')[1]);

const S = parseInt(input[input.length-1].split(' ')[0]);
const T = parseInt(input[input.length-1].split(' ')[1]);

let traced = new Set();
let visited = new Set();

let visitedCnt = [];

let graph = [];

for (var i =0;i<=vCnt;i++) {
    graph.push([]);
    visitedCnt[i] = 0;
}

for (var i = 1;i<input.length-1;i++) {
    let a = parseInt(input[i].split(' ')[0]);
    let b = parseInt(input[i].split(' ')[1]);

    graph[a].push(b);
}

dfs(S,T,S);
dfs(T,S,T);

for (var i = 1;i<=vCnt;i++) {
    if (visitedCnt[i] === 2 && i !== S && i !== T) {
        answer++;
    }
}

console.log(answer);


function dfs(start, end, node) {
    if (node === end) {
        return false;
    }
    
    if (start === S && visitedCnt[node] === 0) {
        visitedCnt[node] = 1;
    }

    if (start === T && visitedCnt[node] === 1) {
        visitedCnt[node] = 2;
    }

    if (visited.has(node)) {
        return true;
    }

    if (traced.has(node)) {
        return false;
    }

    traced.add(node);
    const nodes = graph[node];

    if (!nodes || nodes.length === 0) return;

    for (var i = 0;i<nodes.length;i++) {
        const next = nodes[i];

        if (!dfs(start, end, next)) {
            return false;
        }

    }

    traced.delete(node);
    visited.add(node);

    return true;
}