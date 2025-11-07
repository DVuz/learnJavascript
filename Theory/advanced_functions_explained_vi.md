# Hàm JavaScript - Phần 2: Generator, Async, Pure Function & Nâng cao (Tiếng Việt)

Tài liệu này bổ sung các khái niệm nâng cao về hàm trong JavaScript: generator function, async function, pure function, side effects, memoization, truyền tham số, clone object, arguments trong arrow function, call/apply/bind, và method chaining.

---

## 1) Generator Function là gì?

**Generator function** là một loại hàm đặc biệt có thể tạm dừng thực thi và tiếp tục sau đó. Nó trả về một **generator object** (là iterator).

### Đặc điểm:
- Cú pháp: `function* name() { ... }` (có dấu `*`)
- Sử dụng `yield` để tạm dừng và trả về giá trị
- Mỗi lần gọi `.next()` trên generator object, hàm thực thi đến `yield` tiếp theo
- Trả về object `{ value, done }`

### Ví dụ cơ bản:

```javascript
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUp();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### Ứng dụng:
- Tạo sequence vô hạn
- Lazy evaluation (chỉ tính khi cần)
- Implement custom iterators
- Xử lý async (trước khi có async/await)

### Ví dụ nâng cao - Fibonacci vô hạn:

```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5
```

### Lưu ý:
- Generator không thể là arrow function
- `yield*` dùng để delegate sang generator khác
- Có thể truyền giá trị vào qua `.next(value)`

---

## 2) Async Function là gì?

**Async function** là hàm trả về một Promise và cho phép sử dụng `await` bên trong để chờ Promise resolve.

### Đặc điểm:
- Cú pháp: `async function name() { ... }`
- Luôn trả về Promise
- `await` chỉ dùng được trong async function
- Code sau `await` chờ Promise resolve mới chạy

### Ví dụ cơ bản:

```javascript
async function fetchData() {
  return "Dữ liệu"; // tự động wrap trong Promise
}

fetchData().then(data => console.log(data)); // "Dữ liệu"
```

### Với await:

```javascript
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
```

### Error handling:

```javascript
async function fetchWithError() {
  try {
    const res = await fetch('invalid-url');
    return await res.json();
  } catch (error) {
    console.error('Lỗi:', error);
    return null;
  }
}
```

### So sánh với Promise chain:

```javascript
// Promise chain
function oldWay() {
  return fetch(url)
    .then(res => res.json())
    .then(data => processData(data))
    .catch(err => console.error(err));
}

// Async/await
async function newWay() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return processData(data);
  } catch (err) {
    console.error(err);
  }
}
```

### Lưu ý:
- Async function luôn trả về Promise, ngay cả khi không có `await`
- `await` chỉ pause async function, không block toàn bộ chương trình
- Có thể dùng với arrow function: `const fn = async () => { ... }`

---

## 3) Pure Function là gì?

**Pure function** là hàm thỏa mãn 2 điều kiện:
1. Với cùng input, luôn trả về cùng output (deterministic)
2. Không gây side effects (không thay đổi state bên ngoài)

### Ví dụ Pure Function:

```javascript
// Pure
function add(a, b) {
  return a + b;
}

// Pure
function multiply(arr, factor) {
  return arr.map(x => x * factor); // tạo mảng mới, không thay đổi arr
}
```

### Ví dụ Impure Function:

```javascript
let count = 0;

// Impure: thay đổi biến bên ngoài
function increment() {
  count++;
  return count;
}

// Impure: kết quả phụ thuộc biến bên ngoài
function addToCount(x) {
  return x + count;
}

// Impure: thay đổi input
function addItem(arr, item) {
  arr.push(item); // mutate arr
  return arr;
}

// Impure: gọi API, đọc file (side effect)
function fetchUser(id) {
  return fetch(`/api/users/${id}`);
}
```

### Lợi ích của Pure Function:
- Dễ test (không cần mock state)
- Dễ debug (kết quả dự đoán được)
- Dễ tối ưu (memoization)
- Dễ parallelize
- Dễ reason về code

### Làm thế nào để viết Pure Function:

```javascript
// Bad: mutate input
function addItemBad(arr, item) {
  arr.push(item);
  return arr;
}

// Good: return new array
function addItemGood(arr, item) {
  return [...arr, item];
}

// Bad: depend on external state
const tax = 0.1;
function calculateTotalBad(price) {
  return price + price * tax;
}

// Good: pass all dependencies
function calculateTotalGood(price, taxRate) {
  return price + price * taxRate;
}
```

---

## 4) Side Effects trong hàm là gì?

**Side effect** là bất kỳ thay đổi nào ảnh hưởng đến bên ngoài scope của hàm hoặc tương tác với thế giới bên ngoài.

### Các loại Side Effects:

1. **Thay đổi biến global/external:**
```javascript
let total = 0;
function addToTotal(x) {
  total += x; // side effect: thay đổi biến bên ngoài
}
```

2. **Mutate input:**
```javascript
function sortArray(arr) {
  arr.sort(); // side effect: thay đổi arr gốc
  return arr;
}
```

3. **I/O operations:**
```javascript
function logMessage(msg) {
  console.log(msg); // side effect: ghi ra console
}

function saveToFile(data) {
  fs.writeFileSync('data.json', data); // side effect: ghi file
}
```

4. **Network requests:**
```javascript
function fetchData() {
  return fetch('/api/data'); // side effect: gọi API
}
```

5. **DOM manipulation:**
```javascript
function updateUI(text) {
  document.getElementById('msg').textContent = text; // side effect
}
```

6. **Thay đổi Date/Random:**
```javascript
function getTimestamp() {
  return Date.now(); // side effect: kết quả khác mỗi lần gọi
}

function getRandom() {
  return Math.random(); // side effect: non-deterministic
}
```

### Side Effects không phải là xấu:
- Chương trình thực tế cần side effects (lưu DB, hiển thị UI, gọi API)
- Quan trọng là **quản lý và cô lập** side effects
- Tách logic thuần (pure) và side effects ra riêng

### Best Practices:

```javascript
// Tách pure logic và side effect
function calculateDiscount(price, rate) {
  return price * (1 - rate); // pure
}

function applyDiscount(productId, rate) {
  const product = getProductFromDB(productId); // side effect
  const newPrice = calculateDiscount(product.price, rate); // pure
  updateProductInDB(productId, newPrice); // side effect
  return newPrice;
}
```

---

## 5) Memoization là gì?

**Memoization** là kỹ thuật cache kết quả của hàm dựa trên input để tránh tính toán lại với cùng input.

### Cách hoạt động:
- Lưu kết quả trong một cache (thường là object hoặc Map)
- Khi gọi hàm, kiểm tra cache trước
- Nếu có trong cache, trả về ngay; nếu không, tính và lưu vào cache

### Ví dụ cơ bản:

```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log('Lấy từ cache');
      return cache[key];
    }
    console.log('Tính toán mới');
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Ví dụ fibonacci (rất chậm nếu không memoize)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

const fibMemo = memoize(fib);
console.log(fibMemo(40)); // Chậm lần đầu
console.log(fibMemo(40)); // Nhanh lần sau (từ cache)
```

### Ví dụ thực tế:

```javascript
function expensiveCalculation(x, y) {
  console.log('Đang tính toán phức tạp...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += x * y;
  }
  return result;
}

const memoizedCalc = memoize(expensiveCalculation);
console.log(memoizedCalc(5, 3)); // Tính toán phức tạp
console.log(memoizedCalc(5, 3)); // Lấy từ cache (nhanh)
console.log(memoizedCalc(7, 2)); // Tính toán mới
```

### Memoize với Map (tốt hơn cho complex keys):

```javascript
function memoizeWithMap(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

### Lưu ý:
- Chỉ memoize **pure functions** (cùng input → cùng output)
- Cache có thể tốn bộ nhớ với nhiều input khác nhau
- Cần clear cache nếu hàm phụ thuộc vào state thay đổi
- Đối với recursive functions, cần memoize internal calls

### Memoization với Closure:

```javascript
function fibonacci() {
  const cache = { 0: 0, 1: 1 };
  
  function fib(n) {
    if (n in cache) return cache[n];
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  }
  
  return fib;
}

const fib = fibonacci();
console.log(fib(100)); // Rất nhanh
```

---

## 6) Tham số được truyền theo kiểu tham trị hay tham chiếu?

JavaScript truyền **tất cả** tham số theo **giá trị (pass-by-value)**, nhưng với object/array, giá trị đó là **tham chiếu (reference)**.

### Primitive types (tham trị thuần túy):

```javascript
function changeNumber(x) {
  x = 100;
  console.log('Trong hàm:', x); // 100
}

let num = 5;
changeNumber(num);
console.log('Ngoài hàm:', num); // 5 (không đổi)
```

### Objects/Arrays (tham chiếu):

```javascript
function changeObject(obj) {
  obj.name = 'Thay đổi'; // Thay đổi property
  console.log('Trong hàm:', obj.name);
}

const user = { name: 'An' };
changeObject(user);
console.log('Ngoài hàm:', user.name); // 'Thay đổi' (đã thay đổi!)
```

### Nhưng gán lại tham số không ảnh hưởng bên ngoài:

```javascript
function reassignObject(obj) {
  obj = { name: 'Mới' }; // Gán lại reference (chỉ trong scope hàm)
  console.log('Trong hàm:', obj.name); // 'Mới'
}

const user = { name: 'An' };
reassignObject(user);
console.log('Ngoài hàm:', user.name); // 'An' (không đổi)
```

### Với Array:

```javascript
function modifyArray(arr) {
  arr.push(4); // Thay đổi array gốc
  console.log('Trong hàm:', arr);
}

function replaceArray(arr) {
  arr = [1, 2, 3]; // Gán lại (không ảnh hưởng bên ngoài)
}

const myArr = [1, 2];
modifyArray(myArr);
console.log(myArr); // [1, 2, 4] (đã thay đổi)

replaceArray(myArr);
console.log(myArr); // [1, 2, 4] (không đổi)
```

### Tổng kết:
- **Primitives**: truyền value → không thể thay đổi biến bên ngoài
- **Objects/Arrays**: truyền reference → có thể thay đổi properties/elements
- **Gán lại parameter** (bất kể kiểu gì) không ảnh hưởng biến bên ngoài

### Làm sao để tránh mutation:

```javascript
function safePush(arr, item) {
  return [...arr, item]; // Tạo array mới
}

function safeUpdate(obj, key, value) {
  return { ...obj, [key]: value }; // Tạo object mới
}
```

---

## 7) Làm sao để clone object trong function?

### a) Shallow Copy (copy 1 cấp):

#### 1. Spread operator:
```javascript
function cloneObject(obj) {
  return { ...obj };
}

const original = { a: 1, b: { c: 2 } };
const copy = cloneObject(original);
copy.a = 10;
console.log(original.a); // 1 (không đổi)
copy.b.c = 20;
console.log(original.b.c); // 20 (nested object vẫn bị thay đổi!)
```

#### 2. Object.assign():
```javascript
function cloneObject(obj) {
  return Object.assign({}, obj);
}
```

#### 3. Array - spread:
```javascript
function cloneArray(arr) {
  return [...arr];
}
```

#### 4. Array.slice():
```javascript
function cloneArray(arr) {
  return arr.slice();
}
```

### b) Deep Copy (copy đệ quy tất cả cấp):

#### 1. JSON.parse/stringify (đơn giản nhưng có hạn chế):
```javascript
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const original = { a: 1, b: { c: 2 }, d: [1, 2] };
const copy = deepClone(original);
copy.b.c = 100;
console.log(original.b.c); // 2 (không đổi)
```

**Hạn chế:**
- Mất functions, undefined, Symbol
- Không xử lý được circular references
- Không giữ được Date, RegExp, Map, Set

```javascript
const obj = {
  fn: () => 'test',
  date: new Date(),
  undef: undefined
};
console.log(JSON.parse(JSON.stringify(obj)));
// { date: "2025-01-..." } - mất fn và undef
```

#### 2. Recursive clone (manual):
```javascript
function deepClone(obj, seen = new WeakMap()) {
  // Handle primitives và null
  if (obj === null || typeof obj !== 'object') return obj;
  
  // Handle Date
  if (obj instanceof Date) return new Date(obj);
  
  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item, seen));
  }
  
  // Handle circular reference
  if (seen.has(obj)) return seen.get(obj);
  
  // Handle Object
  const cloned = {};
  seen.set(obj, cloned);
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key], seen);
    }
  }
  
  return cloned;
}
```

#### 3. structuredClone (Native - khuyến nghị):
```javascript
function cloneObject(obj) {
  return structuredClone(obj);
}

const original = {
  a: 1,
  b: { c: 2 },
  date: new Date(),
  map: new Map([['key', 'value']])
};

const copy = structuredClone(original);
// Giữ được Date, Map, Set, typed arrays, etc.
```

### So sánh các phương pháp:

| Phương pháp | Deep Copy | Functions | Date/RegExp | Circular Ref | Performance |
|-------------|-----------|-----------|-------------|--------------|-------------|
| Spread | ❌ | ✅ | ❌ | ❌ | ⚡⚡⚡ |
| JSON | ✅ | ❌ | ❌ | ❌ | ⚡⚡ |
| Recursive | ✅ | ✅ | ✅ | ✅ | ⚡ |
| structuredClone | ✅ | ❌ | ✅ | ✅ | ⚡⚡ |

---

## 8) Tại sao arguments không hoạt động trong arrow function?

Arrow function **không có** object `arguments` riêng. Nếu bạn tham chiếu `arguments` trong arrow function, nó sẽ tìm trong scope bên ngoài (lexical scope).

### Ví dụ lỗi:

```javascript
const sum = () => {
  console.log(arguments); // ReferenceError hoặc arguments từ scope ngoài
};

sum(1, 2, 3);
```

### Tại sao?
Arrow function được thiết kế **nhẹ** và không tạo context riêng cho:
- `this`
- `arguments`
- `super`
- `new.target`

### Giải pháp: Dùng rest parameters:

```javascript
const sum = (...args) => {
  console.log(args); // [1, 2, 3]
  return args.reduce((a, b) => a + b, 0);
};

console.log(sum(1, 2, 3)); // 6
```

### So sánh với function thường:

```javascript
function normalFunc() {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
  
  const arrow = () => {
    console.log(arguments); // Cùng arguments với normalFunc
  };
  
  arrow();
}

normalFunc(1, 2, 3);
```

### Lưu ý:
- `arguments` là array-like object, không phải Array thật
- Rest parameters (`...args`) luôn là Array thật
- Rest parameters linh hoạt hơn (có thể kết hợp với named parameters)

```javascript
function mixed(first, second, ...rest) {
  console.log(first);  // 1
  console.log(second); // 2
  console.log(rest);   // [3, 4, 5]
}

mixed(1, 2, 3, 4, 5);
```

---

## 9) Sự khác biệt giữa call, apply và bind

Ba method này dùng để **điều khiển `this`** trong function call.

### a) call()

**Gọi hàm ngay lập tức**, với `this` chỉ định và các arguments riêng lẻ.

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: 'An' };
console.log(greet.call(user, 'Xin chào', '!')); 
// "Xin chào, An!"
```

### b) apply()

**Gọi hàm ngay lập tức**, với `this` chỉ định và arguments trong **array**.

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: 'Bình' };
console.log(greet.apply(user, ['Chào', '.'])); 
// "Chào, Bình."
```

### c) bind()

**Không gọi hàm ngay**, mà **trả về hàm mới** với `this` đã được cố định.

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: 'Cường' };
const boundGreet = greet.bind(user);

console.log(boundGreet('Hello', '!')); // "Hello, Cường!"
console.log(boundGreet('Hi', '.')); // "Hi, Cường."
```

### So sánh:

| Method | Gọi ngay | Arguments | Use case |
|--------|----------|-----------|----------|
| `call` | ✅ | Riêng lẻ | Gọi 1 lần với this tùy chỉnh |
| `apply` | ✅ | Array | Gọi với array arguments |
| `bind` | ❌ | Riêng lẻ | Tạo hàm mới với this cố định |

### Ví dụ thực tế:

#### 1. call - Mượn method:
```javascript
const person1 = {
  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const person2 = {
  firstName: 'Nguyễn',
  lastName: 'An'
};

console.log(person1.fullName.call(person2)); // "Nguyễn An"
```

#### 2. apply - Math.max với array:
```javascript
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max); // 7

// Hoặc dùng spread (modern)
console.log(Math.max(...numbers)); // 7
```

#### 3. bind - Event handlers:
```javascript
class Counter {
  constructor() {
    this.count = 0;
  }
  
  increment() {
    this.count++;
    console.log(this.count);
  }
  
  setupButton() {
    const button = document.getElementById('btn');
    // Cần bind để giữ this là Counter instance
    button.addEventListener('click', this.increment.bind(this));
  }
}
```

#### 4. bind - Partial application:
```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
console.log(double(7)); // 14

const triple = multiply.bind(null, 3);
console.log(triple(5)); // 15
```

### Lưu ý quan trọng:
- Arrow function **không thể** bind `this` bằng call/apply/bind
- `bind` chỉ hoạt động 1 lần (không thể bind lại)
- Với `call/apply`, nếu truyền `null` hoặc `undefined`, `this` sẽ là global object (strict mode: `undefined`)

---

## 10) Method Chaining là gì?

**Method chaining** là kỹ thuật gọi nhiều methods liên tiếp trên cùng một object bằng cách **return `this`** từ mỗi method.

### Ví dụ cơ bản:

```javascript
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }
  
  add(n) {
    this.value += n;
    return this; // Trả về chính object để chain tiếp
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

const result = new Calculator(10)
  .add(5)       // 15
  .multiply(2)  // 30
  .subtract(10) // 20
  .divide(4)    // 5
  .getResult();

console.log(result); // 5
```

### Ví dụ với String builder:

```javascript
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

const result = new StringBuilder()
  .append('hello')
  .append(' ')
  .append('world')
  .uppercase()
  .toString();

console.log(result); // "HELLO WORLD"
```

### Built-in examples:

#### 1. Array methods:
```javascript
const result = [1, 2, 3, 4, 5]
  .filter(x => x > 2)    // [3, 4, 5]
  .map(x => x * 2)       // [6, 8, 10]
  .reduce((a, b) => a + b, 0); // 24

console.log(result);
```

#### 2. Promise:
```javascript
fetch('/api/data')
  .then(res => res.json())
  .then(data => processData(data))
  .catch(err => console.error(err));
```

### Ví dụ Query Builder:

```javascript
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

const query = new QueryBuilder('users')
  .where('age', '>', 18)
  .where('status', '=', 'active')
  .orderBy('created_at', 'DESC')
  .limit(10)
  .toSQL();

console.log(query);
// SELECT * FROM users WHERE age > '18' AND status = 'active' ORDER BY created_at DESC LIMIT 10
```

### Lợi ích:
- Code ngắn gọn, dễ đọc
- Giống ngôn ngữ tự nhiên (fluent interface)
- Dễ compose các operations

### Nhược điểm:
- Khó debug (nhiều operations trên 1 dòng)
- Có thể khó hiểu với người mới
- Không phù hợp với async operations (nên dùng Promise chain hoặc async/await)

---

## Tổng kết

| Khái niệm | Mục đích | Khi nào dùng |
|-----------|----------|--------------|
| **Generator** | Pause/resume execution | Lazy evaluation, custom iterators |
| **Async/await** | Xử lý Promise dễ đọc | Async operations thay Promise chain |
| **Pure function** | Predictable, testable | Khi có thể, đặc biệt logic core |
| **Memoization** | Cache results | Expensive pure functions |
| **call/apply/bind** | Control `this` | Mượn methods, event handlers |
| **Method chaining** | Fluent API | Builders, query builders |

### Best Practices:
1. Ưu tiên pure functions khi có thể
2. Cô lập side effects
3. Dùng async/await thay Promise chain
4. Clone object khi cần tránh mutation
5. Dùng rest parameters thay `arguments`
6. Method chaining cho builders/fluent APIs

---

**File thực hành:** Xem `advanced_functions_examples.js` để chạy thử tất cả các ví dụ.

