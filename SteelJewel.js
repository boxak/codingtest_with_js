const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const W = parseInt(input[0].split(' ')[0]);
const N = parseInt(input[0].split(' ')[1]);

const jewels = input.slice(1);

for (var i = 0;i<N;i++) {
    var temp = jewels[i].split(' ');
    var weight = parseInt(temp[0]);
    var price = parseInt(temp[1]);

    jewels[i] = {
        'weight' : weight,
        'price' : price
    };
}

jewels.sort((j1,j2) => {
    return j2.price - j1.price;
});

let totalPrice = 0;
let totalWgt = 0;

for (var i = 0;i<jewels.length;i++) {

    let weight = jewels[i].weight;
    let price = jewels[i].price;

    if (totalWgt + weight < W) {
        totalWgt+=weight;
        totalPrice+=weight*price;
    } else {
        let tempWgt = totalWgt+ weight - W;
        totalPrice+=(weight-tempWgt)*price;
        break;
    }
}

console.log(totalPrice);