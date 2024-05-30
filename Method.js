var circle = {
  x: 0,
  y: 0,
  r: 0,
  center: [this.x, this.y],
  area: function () {
    return Math.PI * this.radius * this.radius;
  },
};

circle.radius = 10;

console.log(circle.area());
