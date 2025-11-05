console.log('--- Function declaration vs function expression ---');
// Function declaration (hoisted)
console.log('sumDeclaration(2,3) =>', sumDeclaration(2,3));
function sumDeclaration(a, b) { return a + b; }

// Function expression (not hoisted the same way)
const sumExpression = function(a, b) { return a + b; };
console.log('sumExpression(2,3) =>', sumExpression(2,3));

console.log('\n--- Arrow function vs normal function ---');
const arrow = (x) => x * 2;
function normal(x) { return x * 2; }
console.log('arrow(5) =>', arrow(5));
console.log('normal(5) =>', normal(5));

console.log('\n--- this in arrow function ---');
function Person(name) {
  this.name = name;
  this.timer = null;
}
Person.prototype.startArrow = function() {
  this.timer = setTimeout(() => {
    console.log('arrow this.name =>', this.name);
  }, 10);
};
Person.prototype.startNormal = function() {
  this.timer = setTimeout(function() {
    // here `this` is not the Person instance
    console.log('normal this.name =>', this && this.name);
  }, 10);
};
const p = new Person('An');
p.startArrow();
p.startNormal();

console.log('\n--- Default parameters ---');
function greet(name = 'Khách', msg = `Xin chào, ${name}`) {
  return msg;
}
console.log('greet() =>', greet());
console.log("greet(null) =>", greet(null));
console.log("greet(undefined) =>", greet(undefined));

console.log('\n--- Rest parameter vs Spread operator ---');
function sumAll(...nums) {
  return nums.reduce((s,x) => s + x, 0);
}
console.log('sumAll(1,2,3) =>', sumAll(1,2,3));
const arr = [1,2,3];
console.log('[0, ...arr, 4] =>', [0, ...arr, 4]);

console.log('\n--- Callback example ---');
function map(arr, fn) {
  const out = [];
  for (let i = 0; i < arr.length; i++) out.push(fn(arr[i], i));
  return out;
}
console.log('map([1,2,3], x=>x*2) =>', map([1,2,3], x => x * 2));

console.log('\n--- Higher-order function ---');
function makeAdder(x) { return function(y) { return x + y; }; }
const add10 = makeAdder(10);
console.log('add10(5) =>', add10(5));

console.log('\n--- Currying ---');
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return function(...more) { return curried.apply(this, args.concat(more)); };
  };
}
function sum3(a,b,c) { return a + b + c; }
const cur = curry(sum3);
console.log('cur(1)(2)(3) =>', cur(1)(2)(3));
console.log('cur(1,2)(3) =>', cur(1,2)(3));

console.log('\n--- Function composition ---');
const compose = (...fns) => x => fns.reduceRight((v,f) => f(v), x);
const double = x => x * 2;
const inc = x => x + 1;
const incThenDouble = compose(double, inc);
console.log('incThenDouble(3) =>', incThenDouble(3));

console.log('\n--- IIFE (Immediately Invoked Function Expression) ---');
(function(msg){
  console.log('IIFE says:', msg);
})('Hello IIFE');

// Delay to allow setTimeout logs to appear before node exits
setTimeout(() => {}, 50);

