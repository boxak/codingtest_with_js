function varTest() {
  console.log(x);
  if (true) {
    var x = 1;
    console.log(x);
  }

  console.log(x);
}

varTest();

function letConstTest() {
  console.log(y);
  let y = 2;
}

letConstTest();
