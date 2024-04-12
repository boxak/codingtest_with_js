var minValue = 1000000;

function solution(picks, minerals) {
  var answer = 0;
  
  var record = [];

  var mineralInfo = {
    diamond : 0,
    iron : 1,
    stone: 2
  };

  var info = [
    [1,1,1],
    [5,1,1],
    [25,5,1]
  ];
  
  // pick : 0 - 다이아, 1 - 철, 2 - 돌
  for (var pick = 0;pick<3;pick++) {
    var sum = 0;
    var tempArray = [];
    for (var mineral = 0;mineral<minerals.length;mineral++) {
      var mineralNumber = mineralInfo[minerals[mineral]];

      sum+=info[pick][mineralNumber];

      if (mineral%5 === 4) {
        tempArray.push(sum);
        sum = 0;
      }
    }

    if (sum !== 0) {
      tempArray.push(sum);
    }

    record.push(tempArray);
  }

  dfs(record, picks[0], picks[1], picks[2], 0, 0);

  answer = minValue;

  return answer;
}

function dfs(record, dia, iron, stone, idx, sum) {
  if (idx === record[0].length || (dia===0 && iron === 0 && stone === 0)) {
    minValue = Math.min(minValue, sum);
    return;
  }

  for (var i = 0;i<3;i++) {
    if (i === 0 && dia > 0) {
      dfs(record, dia-1,iron, stone, idx+1, sum + record[i][idx]);
    } 
    if (i === 1 && iron > 0) {
      dfs(record, dia, iron-1,stone,idx+1, sum + record[i][idx]);
    }
    if (i === 2 && stone > 0) {
      dfs(record, dia, iron, stone-1,idx+1, sum + record[i][idx]);
    }
  }

}


solution([0, 1, 1], ["diamond", "diamond", "diamond", "diamond", "diamond", "iron", "iron", "iron", "iron", "iron", "diamond"]);