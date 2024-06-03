function Primes(n) {
  var p = [];

  for (var i = 2; i <= n; i++) {
    p[i] = true;
  }

  var max = Math.floor(Math.sqrt(n));

  for (var x = 2; x <= max; x++) {
    for (var i = x * 2; i <= n; i += x) {
      p[i] = false;
    }

    while (p[++x]);
  }

  var primes = [],
    nprimes = 0;
  for (var i = 2; i <= n; i++) {
    if (p[i]) {
      primes[nprimes++] = i;
    }
  }

  p = null;

  return function (m) {
    for (var i = 0, product = 1; i < m; i++) {
      product *= primes[Math.floor(Math.random() * nprimes)];
    }

    return product;
  };
}

var primeProduct = Primes(100000);
console.log(primeProduct(2));
console.log(primeProduct(2));
