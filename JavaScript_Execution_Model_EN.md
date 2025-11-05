# Detailed Description of JavaScript Execution Model and Core Concepts (English)

This file answers in detail the following questions:
- What is hoisting?
- What is the Temporal Dead Zone (TDZ)?
- Compare `var`, `let`, and `const`.
- Does `const` mean immutable?
- What does it mean that JavaScript is single-threaded?
- What is an execution context?
- What is the global object in the browser and in Node.js?
- What is the call stack?
- What is the event loop?
- When does a stack overflow occur?

---

## 1. What is hoisting?
Hoisting is JavaScript's behavior where variable declarations and function declarations are conceptually moved ("hoisted") to the top of their containing scope before execution. This does not move assignments; it means the identifiers are known to the runtime before code runs.

- For function declarations (e.g. `function f(){}`), the whole function (name and body) is hoisted, so you may call the function before its declaration.

```javascript
console.log(typeof f); // "function"
console.log(f());      // works
function f(){ return 'ok'; }
```

- For `var`, the name is hoisted and initialized to `undefined` before execution runs; the assignment remains in place. Accessing a `var` variable before its assignment returns `undefined` rather than throwing.

```javascript
console.log(a); // undefined
var a = 10;
```

- For `let` and `const`, the variable names are registered early but not initialized — they are in the Temporal Dead Zone (TDZ) until the actual initialization statement runs. Accessing them earlier throws a `ReferenceError`.

---

## 2. What is the Temporal Dead Zone (TDZ)?
The Temporal Dead Zone (TDZ) is the period between entering a scope (e.g., a block or function) and the point where a `let` or `const` variable is initialized. During the TDZ, the variable exists logically but cannot be accessed; any access raises a `ReferenceError`.

Example:

```javascript
{
  // TDZ for `x` starts here
  // console.log(x); // ReferenceError
  let x = 5; // after this line x is initialized
  console.log(x); // 5
}
```

TDZ helps catch mistakes like using a variable before it is initialized and is one reason `let`/`const` are safer than `var`.

---

## 3. Compare `var`, `let`, and `const`
Summary of the main differences:

- Scope:
  - `var` is function-scoped (or global-scoped if declared at top level).
  - `let` and `const` are block-scoped (scoped to `{}`).

- Hoisting / TDZ:
  - `var` is hoisted and initialized to `undefined` — early access returns `undefined`.
  - `let`/`const` are hoisted but not initialized and reside in the TDZ — early access throws `ReferenceError`.

- Reassignment and redeclaration:
  - `var` allows redeclaration in the same scope and reassignment.
  - `let` allows reassignment but not redeclaration in the same scope.
  - `const` disallows reassignment and redeclaration in the same scope.

- `const` requires an initializer at declaration time.

Example:

```javascript
function demo(){
  var v = 1;
  var v = 2; // valid

  let l = 1;
  // let l = 2; // SyntaxError: Identifier 'l' has already been declared

  const c = 1;
  // c = 2; // TypeError: Assignment to constant variable.
}
```

---

## 4. Does `const` mean immutable?
Not necessarily. `const` means the variable binding cannot be reassigned (the binding is constant). If the value is an object (including arrays and functions), the object's contents are still mutable.

Example:

```javascript
const a = { x: 1 };
a.x = 2; // allowed, property changed
// a = { x: 3 } // error: cannot reassign the binding

const arr = [1,2];
arr.push(3); // allowed
```

To obtain immutability you must use patterns or helpers like `Object.freeze()` (shallow freeze), libraries (Immutable.js), or treat values as immutable by convention.

---

## 5. What does it mean that JavaScript is single-threaded?
Saying JavaScript is "single-threaded" means that JavaScript code executes on a single main thread — only one piece of JavaScript code runs at a time on that thread. This simplifies reasoning about data races in synchronous code: two JavaScript statements cannot run in parallel on that thread.

However, the environment (browser or Node.js) may perform I/O, timers, rendering, or native tasks on other threads outside the JS engine, and then schedule callbacks back to the main thread via the event loop.

Consequences:
- I/O operations do not block the main JS thread; they are handled asynchronously and their callbacks run later on the main thread.
- Long-running CPU tasks will block the main thread, causing UI jank in browsers or making the process unresponsive.

---

## 6. What is an execution context?
An execution context is a record the engine creates each time a piece of code is executed (for global code, function calls, or `eval`). It contains the information needed to run that code, typically:

1. Variable Environment — where variable and function declarations are stored and references to outer environment.
2. Lexical Environment — includes the Variable Environment plus a link to the outer (parent) lexical environment (scope chain) used for identifier lookup.
3. `this` binding — the value of `this` for that context.

When a function is called, the engine creates a new execution context and pushes it onto the call stack. When the function returns, the context is popped.

Common types of execution contexts:
- Global execution context — created once for the program's global code.
- Function execution context — created each time a function is invoked.

ES modules have slightly different initialization semantics but still follow the execution-context model.

---

## 7. Global object in the browser and Node.js
The global object is the top-level object that holds globally accessible properties and environment-specific APIs.

- In browsers: the global object is `window` (in workers it's `self`), while `globalThis` is the standardized global reference. Variables declared with `var` at top level become properties of `window`, while `let`/`const` do not create global properties.

```javascript
var a = 1;
let b = 2;
console.log(window.a); // 1
console.log(window.b); // undefined
```

- In Node.js: the global object is `global`. In module code (CommonJS or ESM), your module scope is not the global object; module-level `var/let/const` do not become properties on `global`. Use `globalThis` when you need a cross-environment global reference.

```javascript
console.log(global === globalThis); // true in Node
```

---

## 8. What is the call stack?
The call stack is a LIFO (last-in, first-out) data structure the engine uses to track active execution contexts. When a function is called, its execution context is pushed onto the stack; when the function finishes, its context is popped.

Example:

```javascript
function a(){
  b();
}
function b(){
  c();
}
function c(){
  console.log('inside c');
}
a();
```

Timeline of the call stack:
- Global context (pushed at program start)
- call `a()` -> push `a` context
- `a` calls `b()` -> push `b`
- `b` calls `c()` -> push `c`
- `c` finishes -> pop `c`
- `b` finishes -> pop `b`
- `a` finishes -> pop `a`

Call stack overflows when too many contexts are pushed (e.g., due to unbounded recursion).

---

## 9. What is the event loop?
The event loop is the mechanism that coordinates execution between the call stack and various task queues (where asynchronous callbacks are placed). It ensures that asynchronous callbacks run when the call stack is empty.

Simple flow:
1. The call stack runs synchronous code.
2. Asynchronous operations (I/O, timers, events) post callbacks to task queues (macrotask queue or microtask queue) when they complete.
3. The event loop checks when the call stack is empty, processes microtasks first (e.g., Promise callbacks, queueMicrotask), and only after microtasks finishes it processes one macrotask (e.g., setTimeout callback), then repeats.

Microtasks have higher priority than macrotasks; promise callbacks run before the next macrotask.

Example showing ordering:

```javascript
console.log('script start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));

console.log('script end');

// Output:
// script start
// script end
// promise
// timeout
```

Explanation:
- `script start` and `script end` run synchronously.
- Promise's `.then` callback is a microtask — it runs after the call stack empties but before macrotasks.
- `setTimeout` callback is a macrotask — it runs after microtasks.

Event loop enables asynchronous non-blocking I/O while keeping JS execution single-threaded.

---

## 10. When does stack overflow occur?
A stack overflow happens when the call stack exceeds the maximum allowed depth for the runtime, commonly due to excessively deep recursion or an infinite recursive call chain.

Example:

```javascript
function f(){
  f(); // calls itself indefinitely
}
f();
// Results in a RangeError: Maximum call stack size exceeded (or similar)
```

Causes:
- Recursion without a base case.
- Very deep nested function calls beyond the engine's stack limit.

How to avoid:
- Ensure recursion has a base (termination) condition.
- Convert recursion to iteration when possible.
- Use techniques like tail-call optimization (TCO) where supported (rare in modern engines) or split work into smaller tasks scheduled via the event loop.

---

### Tips & quick summary
- Prefer `let`/`const` over `var` to avoid hoisting and scope pitfalls.
- `const` keeps the binding constant; objects referenced by `const` can still be mutated.
- Understand microtasks vs macrotasks to predict callback ordering.
- Avoid long-running CPU tasks on the main thread to keep UI responsive.
- If you see a `ReferenceError` related to TDZ, check for `let`/`const` use before initialization.

---

If you want, I can:
- Add runnable examples in `examples.js` to observe hoisting, TDZ, and event loop ordering in Node or browser console.
- Add short unit tests or quick scripts to demonstrate stack overflow or call stack traces.


