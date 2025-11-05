// ===================================================================
// FILE THỰC HÀNH: ADVANCED FUNCTIONS IN JAVASCRIPT
// Chạy file này bằng: node advanced_functions_examples.js
// ===================================================================

console.log('='.repeat(60));
console.log('1) GENERATOR FUNCTION');
console.log('='.repeat(60));

// Generator cơ bản
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUp();
console.log('Generator cơ bản:');
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Generator với vòng lặp
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

console.log('\nFibonacci với Generator (10 số đầu):');
const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}

// Generator với ID
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

console.log('\nID Generator:');
const idGen = idGenerator();
console.log('ID 1:', idGen.next().value);
console.log('ID 2:', idGen.next().value);
console.log('ID 3:', idGen.next().value);

// Generator với range
function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

console.log('\nRange Generator (1-10, step 2):');
for (const num of range(1, 10, 2)) {
  console.log(num);
}

console.log('\n' + '='.repeat(60));
console.log('2) ASYNC FUNCTION');
console.log('='.repeat(60));

// Async function cơ bản
async function fetchData() {
  return "Dữ liệu đã tải";
}

fetchData().then(data => console.log('Async cơ bản:', data));

// Simulate API call
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUserData(userId) {
  console.log(`\nBắt đầu tải dữ liệu user ${userId}...`);
  await delay(1000); // Giả lập network delay
  return { id: userId, name: `User ${userId}`, email: `user${userId}@example.com` };
}

// Async/await với error handling
async function getUserWithErrorHandling(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log('User data:', user);
    return user;
  } catch (error) {
    console.error('Lỗi:', error);
    return null;
  }
}

// Chạy async function (dùng IIFE để await)
(async () => {
  await getUserWithErrorHandling(123);

  // Parallel async calls
  console.log('\nGọi 3 API song song:');
  const start = Date.now();
  const [user1, user2, user3] = await Promise.all([
    fetchUserData(1),
    fetchUserData(2),
    fetchUserData(3)
  ]);
  console.log('Hoàn thành trong:', Date.now() - start, 'ms');
  console.log('Users:', user1, user2, user3);
})();

console.log('\n' + '='.repeat(60));
console.log('3) PURE FUNCTION vs IMPURE FUNCTION');
console.log('='.repeat(60));

// Pure functions
function add(a, b) {
  return a + b;
}

function multiplyArray(arr, factor) {
  return arr.map(x => x * factor);
}

console.log('\nPure functions:');
console.log('add(2, 3):', add(2, 3));
console.log('add(2, 3):', add(2, 3)); // Luôn trả về 5

const numbers = [1, 2, 3];
console.log('multiplyArray([1,2,3], 2):', multiplyArray(numbers, 2));
console.log('Original array:', numbers); // Không thay đổi

// Impure functions
let count = 0;

function increment() {
  count++; // Side effect: thay đổi biến ngoài
  return count;
}

console.log('\nImpure function:');
console.log('increment():', increment()); // 1
console.log('increment():', increment()); // 2 (kết quả khác!)
console.log('count:', count);

// So sánh: mutation vs immutable
function addItemImpure(arr, item) {
  arr.push(item); // Mutate
  return arr;
}

function addItemPure(arr, item) {
  return [...arr, item]; // Tạo mới
}

const original = [1, 2, 3];
const result1 = addItemImpure(original, 4);
console.log('\nImpure - Original changed:', original); // [1,2,3,4]

const original2 = [1, 2, 3];
const result2 = addItemPure(original2, 4);
console.log('Pure - Original unchanged:', original2); // [1,2,3]
console.log('Pure - New array:', result2); // [1,2,3,4]

console.log('\n' + '='.repeat(60));
console.log('4) SIDE EFFECTS');
console.log('='.repeat(60));

console.log('\nCác loại side effects:');

// 1. Thay đổi biến external
let total = 0;
function addToTotal(x) {
  total += x; // Side effect
  return total;
}
console.log('addToTotal(5):', addToTotal(5));
console.log('total:', total); // Đã thay đổi

// 2. Console.log (I/O side effect)
function logAndReturn(x) {
  console.log('Value:', x); // Side effect
  return x * 2;
}
logAndReturn(5);

// 3. Date/Random (non-deterministic)
function getTimestamp() {
  return Date.now(); // Side effect: kết quả khác mỗi lần
}
console.log('Timestamp 1:', getTimestamp());
setTimeout(() => console.log('Timestamp 2:', getTimestamp()), 10);

// Best practice: Tách pure logic và side effects
function calculatePrice(price, taxRate) {
  return price * (1 + taxRate); // Pure
}

function displayPrice(price, taxRate) {
  const total = calculatePrice(price, taxRate); // Pure
  console.log(`Tổng: ${total} VND`); // Side effect
  return total;
}

console.log('\nTách pure và side effect:');
displayPrice(100000, 0.1);

console.log('\n' + '='.repeat(60));
console.log('5) MEMOIZATION');
console.log('='.repeat(60));

// Memoize function
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log('📦 Cache hit!');
      return cache[key];
    }
    console.log('⚙️  Calculating...');
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Expensive calculation
function expensiveAdd(a, b) {
  // Giả lập tính toán nặng
  let result = a + b;
  for (let i = 0; i < 100000000; i++) {
    result += 0;
  }
  return result;
}

const memoizedAdd = memoize(expensiveAdd);

console.log('\nMemoization demo:');
console.time('First call');
console.log('Result:', memoizedAdd(5, 3));
console.timeEnd('First call');

console.time('Second call (cached)');
console.log('Result:', memoizedAdd(5, 3));
console.timeEnd('Second call (cached)');

console.time('Different args');
console.log('Result:', memoizedAdd(10, 20));
console.timeEnd('Different args');

// Fibonacci với memoization
function createFibonacci() {
  const cache = { 0: 0, 1: 1 };

  function fib(n) {
    if (n in cache) return cache[n];
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  }

  return fib;
}

const fibMemo = createFibonacci();
console.log('\nFibonacci với memoization:');
console.log('fib(40):', fibMemo(40)); // Rất nhanh
console.log('fib(50):', fibMemo(50));

console.log('\n' + '='.repeat(60));
console.log('6) TRUYỀN THAM SỐ: VALUE vs REFERENCE');
console.log('='.repeat(60));

// Primitives: pass by value
function changeNumber(x) {
  x = 100;
  console.log('Trong hàm:', x);
}

let num = 5;
console.log('\nPrimitive - Before:', num);
changeNumber(num);
console.log('Primitive - After:', num); // Không đổi

// Objects: pass by reference
function changeObject(obj) {
  obj.name = 'Đã thay đổi';
  console.log('Trong hàm:', obj.name);
}

const user = { name: 'Nguyễn Văn A' };
console.log('\nObject - Before:', user);
changeObject(user);
console.log('Object - After:', user); // Đã thay đổi!

// Gán lại parameter không ảnh hưởng
function reassignObject(obj) {
  obj = { name: 'Object mới' };
  console.log('Trong hàm (gán lại):', obj.name);
}

const user2 = { name: 'Trần Thị B' };
console.log('\nReassign - Before:', user2);
reassignObject(user2);
console.log('Reassign - After:', user2); // Không đổi

// Array
function modifyArray(arr) {
  arr.push(4);
}

function replaceArray(arr) {
  arr = [9, 9, 9];
}

const myArr = [1, 2, 3];
console.log('\nArray - Original:', myArr);
modifyArray(myArr);
console.log('Array - After push:', myArr); // Đã thay đổi
replaceArray(myArr);
console.log('Array - After replace:', myArr); // Không đổi

console.log('\n' + '='.repeat(60));
console.log('7) CLONE OBJECT');
console.log('='.repeat(60));

// Shallow copy với spread
const original1 = { a: 1, b: { c: 2 } };
const shallow = { ...original1 };
shallow.a = 10;
shallow.b.c = 20;

console.log('\nShallow copy:');
console.log('Original:', original1); // b.c đã thay đổi!
console.log('Copy:', shallow);

// Deep copy với JSON
const original3 = { a: 1, b: { c: 2 }, arr: [1, 2] };
const deep = JSON.parse(JSON.stringify(original3));
deep.b.c = 100;
deep.arr.push(3);

console.log('\nDeep copy (JSON):');
console.log('Original:', original3); // Không đổi
console.log('Copy:', deep);

// JSON limitations
const withFunctions = {
  name: 'Test',
  fn: () => 'hello',
  date: new Date(),
  undef: undefined
};

console.log('\nJSON limitations:');
console.log('Original:', withFunctions);
console.log('After JSON:', JSON.parse(JSON.stringify(withFunctions)));

// Deep clone function
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (Array.isArray(obj)) return obj.map(item => deepClone(item, seen));
  if (seen.has(obj)) return seen.get(obj);

  const cloned = {};
  seen.set(obj, cloned);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key], seen);
    }
  }

  return cloned;
}

const complex = { a: 1, b: { c: { d: 2 } }, date: new Date() };
const cloned = deepClone(complex);
cloned.b.c.d = 999;

console.log('\nCustom deep clone:');
console.log('Original:', complex);
console.log('Cloned:', cloned);

console.log('\n' + '='.repeat(60));
console.log('8) ARGUMENTS vs REST PARAMETERS');
console.log('='.repeat(60));

// Regular function có arguments
function normalSum() {
  console.log('\narguments object:', arguments);
  console.log('Type:', typeof arguments);
  console.log('Is Array?', Array.isArray(arguments));

  // Convert to array
  const arr = Array.from(arguments);
  return arr.reduce((sum, num) => sum + num, 0);
}

console.log('Sum:', normalSum(1, 2, 3, 4, 5));

// Arrow function KHÔNG có arguments
const arrowSum = (...args) => {
  console.log('\nrest parameters:', args);
  console.log('Type:', typeof args);
  console.log('Is Array?', Array.isArray(args));
  return args.reduce((sum, num) => sum + num, 0);
};

console.log('Sum:', arrowSum(1, 2, 3, 4, 5));

// Rest params linh hoạt hơn
function betterSum(multiplier, ...numbers) {
  console.log('\nmultiplier:', multiplier);
  console.log('numbers:', numbers);
  return numbers.reduce((sum, num) => sum + num, 0) * multiplier;
}

console.log('Result:', betterSum(2, 10, 20, 30));

// Arguments trong nested function
function outer() {
  console.log('\nOuter arguments:', arguments);

  function inner() {
    console.log('Inner arguments:', arguments);
  }

  const arrowInner = () => {
    console.log('Arrow arguments (từ outer):', arguments);
  };

  inner(3, 4);
  arrowInner(5, 6);
}

outer(1, 2);

console.log('\n' + '='.repeat(60));
console.log('9) CALL, APPLY, BIND');
console.log('='.repeat(60));

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person1 = { name: 'Nguyễn Văn A' };
const person2 = { name: 'Trần Thị B' };

// call() - arguments riêng lẻ
console.log('\ncall():');
console.log(greet.call(person1, 'Xin chào', '!'));
console.log(greet.call(person2, 'Hello', '.'));

// apply() - arguments trong array
console.log('\napply():');
console.log(greet.apply(person1, ['Chào', '!!!']));
console.log(greet.apply(person2, ['Hi', '...']));

// bind() - trả về function mới
console.log('\nbind():');
const greetPerson1 = greet.bind(person1);
console.log(greetPerson1('Bonjour', '~'));
console.log(greetPerson1('Hola', '!'));

// Use case: Mượn method
const arr1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const result = Array.prototype.slice.call(arr1);
console.log('\nMượn Array.slice:', result);

// Use case: Math.max với array
const numbers2 = [5, 6, 2, 3, 7];
console.log('Max with apply:', Math.max.apply(null, numbers2));
console.log('Max with spread:', Math.max(...numbers2));

// Use case: Partial application với bind
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log('\nPartial application:');
console.log('double(5):', double(5));
console.log('triple(5):', triple(5));

// Arrow function không thể bind this
const obj = {
  name: 'Object',
  normalMethod: function() {
    return `Normal: ${this.name}`;
  },
  arrowMethod: () => {
    return `Arrow: ${this.name}`;
  }
};

const normalUnbound = obj.normalMethod;
const arrowUnbound = obj.arrowMethod;

console.log('\nBind với arrow function:');
console.log(normalUnbound.call(obj)); // "Normal: Object"
console.log(arrowUnbound.call(obj));  // "Arrow: undefined" (không bind được)

console.log('\n' + '='.repeat(60));
console.log('10) METHOD CHAINING');
console.log('='.repeat(60));

// Calculator với method chaining
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this; // Return this để chain
  }

  subtract(n) {
    this.value -= n;
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  divide(n) {
    this.value /= n;
    return this;
  }

  getResult() {
    return this.value;
  }
}

console.log('\nCalculator chaining:');
const calcResult = new Calculator(10)
  .add(5)       // 15
  .multiply(2)  // 30
  .subtract(10) // 20
  .divide(4)    // 5
  .getResult();

console.log('Result:', calcResult);

// StringBuilder
class StringBuilder {
  constructor() {
    this.str = '';
  }

  append(text) {
    this.str += text;
    return this;
  }

  prepend(text) {
    this.str = text + this.str;
    return this;
  }

  uppercase() {
    this.str = this.str.toUpperCase();
    return this;
  }

  lowercase() {
    this.str = this.str.toLowerCase();
    return this;
  }

  toString() {
    return this.str;
  }
}

console.log('\nStringBuilder chaining:');
const str = new StringBuilder()
  .append('hello')
  .append(' ')
  .append('world')
  .uppercase()
  .toString();

console.log('Result:', str);

// Query Builder
class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.whereClause = [];
    this.limitValue = null;
    this.orderByField = null;
  }

  where(field, operator, value) {
    this.whereClause.push({ field, operator, value });
    return this;
  }

  orderBy(field, direction = 'ASC') {
    this.orderByField = { field, direction };
    return this;
  }

  limit(n) {
    this.limitValue = n;
    return this;
  }

  toSQL() {
    let sql = `SELECT * FROM ${this.table}`;

    if (this.whereClause.length > 0) {
      const conditions = this.whereClause
        .map(w => `${w.field} ${w.operator} '${w.value}'`)
        .join(' AND ');
      sql += ` WHERE ${conditions}`;
    }

    if (this.orderByField) {
      sql += ` ORDER BY ${this.orderByField.field} ${this.orderByField.direction}`;
    }

    if (this.limitValue) {
      sql += ` LIMIT ${this.limitValue}`;
    }

    return sql;
  }
}

console.log('\nQuery Builder chaining:');
const query = new QueryBuilder('users')
  .where('age', '>', 18)
  .where('status', '=', 'active')
  .orderBy('created_at', 'DESC')
  .limit(10)
  .toSQL();

console.log('SQL:', query);

// Array method chaining (built-in)
console.log('\nArray method chaining:');
const arrayResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(x => x % 2 === 0)      // [2, 4, 6, 8, 10]
  .map(x => x * 2)               // [4, 8, 12, 16, 20]
  .reduce((sum, x) => sum + x, 0); // 60

console.log('Result:', arrayResult);

console.log('\n' + '='.repeat(60));
console.log('HOÀN THÀNH TẤT CẢ CÁC VÍ DỤ!');
console.log('='.repeat(60));

