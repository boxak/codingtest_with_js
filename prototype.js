function F() {}

F.prototype.prop = "prototype value";
var obj = new F();

console.log(obj.prop);

F.prototype.prop = "instance value";
console.log(F.prototype.prop);
