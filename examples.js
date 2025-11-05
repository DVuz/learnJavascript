// examples.js - runnable demonstrations for JavaScript concepts

console.log('--- Hoisting: function and var ---');
console.log(typeof hoistedFunction); // function
console.log(hoistedFunction()); // 'I am hoisted'
function hoistedFunction() { return 'I am hoisted'; }

console.log(hoistedVar); // undefined (var is hoisted and initialized to undefined)
var hoistedVar = 123;
console.log(hoistedVar);

console.log('\n--- TDZ (Temporal Dead Zone) demonstration ---');
try {
  console.log(tdzVar); // ReferenceError for let
} catch (e) {
  console.log('Accessing let before init throws:', e && e.name);
}
let tdzVar = 'now initialized';
console.log(tdzVar);

console.log('\n--- var / let / const differences ---');
// var redeclare
var x = 1;
var x = 2; // allowed
console.log('var redeclare result x =', x);

// let redeclare (caught)
try {
  let y = 1;
  // let y = 2; // would be SyntaxError if actually redeclared in same scope; demonstrate via eval
  eval('let y = 2');
} catch (e) {
  console.log('let redeclare throws:', e && e.name);
}

// const reassignment (caught)
const c = 10;
try {
  // c = 20; // throws TypeError
  eval('c = 20');
} catch (e) {
  console.log('const reassignment throws:', e && e.name);
}
console.log('const binding c =', c);

console.log('\n--- const and object mutability ---');
const obj = { a: 1 };
obj.a = 2; // allowed
console.log('mutated obj.a =', obj.a);
// obj = {}; // not allowed; would throw if attempted

console.log('\n--- Event loop: microtasks vs macrotasks ---');
console.log('script start');
setTimeout(() => console.log('timeout callback (macrotask)'), 0);
Promise.resolve().then(() => console.log('promise callback (microtask)'));
console.log('script end');

// Give the event loop a moment in Node: schedule a short delay before next section
setTimeout(() => {
  console.log('\n--- Call stack demonstration ---');
  function a(){ b(); }
  function b(){ c(); }
  function c(){ console.log('inside c'); }
  a();

  console.log('\n--- Stack overflow demo (commented out) ---');
  console.log('To demonstrate stack overflow, uncomment the recursive call below.');
  // Warning: the following will cause RangeError: Maximum call stack size exceeded if uncommented
  // function recurse(){ recurse(); }
  // recurse();

}, 50);

