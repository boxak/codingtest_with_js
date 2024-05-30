var x = 1;

function first() {
  var x = 10;
  function second() {
    console.log(x);
  }
  second();
}

first();
