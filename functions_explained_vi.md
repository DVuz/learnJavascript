# Hàm trong JavaScript — Giải thích chi tiết (Tiếng Việt)

Tài liệu này trình bày chi tiết các khái niệm bạn yêu cầu: function declaration vs function expression, arrow function vs function thường, `this` trong arrow function, default parameter, rest vs spread, callback, higher-order function, currying, function composition, và IIFE.

Mở đầu — kế hoạch ngắn
- Mục tiêu: giải thích khái niệm, chỉ ra khác biệt quan trọng, nêu ví dụ ngắn chạy được và lưu ý lỗi thường gặp.
- Kết quả: bạn sẽ có một tài liệu tham khảo để đọc và sử dụng trong code.

Nội dung
- Function declaration khác function expression thế nào?
- Arrow function khác function thường?
- `this` trong arrow function
- Default parameter trong function
- Rest parameter và spread operator khác nhau thế nào?
- Callback là gì?
- Higher-order function là gì?
- Currying function là gì?
- Function composition là gì?
- IIFE (Immediately Invoked Function Expression) là gì?

---

1) Function declaration vs Function expression

- Function Declaration (khai báo hàm):
  - Cú pháp: `function name(params) { ... }`.
  - Được hoisted: toàn bộ declaration (tên và thân) được đưa lên đầu scope, vì vậy bạn có thể gọi hàm trước khi khai báo trong cùng scope.
  - Thường dùng để định nghĩa các hàm có tên rõ ràng, dễ đọc.

Ví dụ:

```javascript
console.log(sum(2,3)); // 5 — gọi trước khi khai báo vì hoisting
function sum(a, b) {
  return a + b;
}
```

- Function Expression (biểu thức hàm):
  - Cú pháp: `const fn = function(params) { ... }` hoặc `let fn = function name(params) { ... }`.
  - Không hoisted theo cùng cách: chỉ biến (ví dụ `var`) sẽ hoist tên biến nhưng chưa có giá trị; với `let/const` biến chưa thể dùng trước khi khai báo (TDZ). Bạn không thể gọi hàm trước dòng gán.
  - Có thể là anonymous function (không có tên) hoặc named function expression (có tên chỉ dùng trong thân hàm để đệ quy).

Ví dụ:

```javascript
// console.log(mult(2,3)); // ReferenceError nếu dùng const/let hoặc undefined nếu var (vì hoisting biến nhưng chưa gán)
const mult = function(a, b) {
  return a * b;
};
console.log(mult(2,3)); // 6
```

Lưu ý:
- Khi cần hoisting để API có thể gọi trước khai báo, dùng function declaration.
- Function expressions linh hoạt hơn (gán vào biến, truyền làm tham số, tạo closures động).


2) Arrow function khác function thường?

- Cú pháp ngắn gọn: `(a, b) => a + b` hoặc `x => { return x * x }`.
- Điểm khác biệt quan trọng so với function expression thông thường:
  - Không có binding của `this` riêng — `this` được lấy (lexical) từ scope bao quanh (giống biến), tức là arrow function không tạo context `this` mới.
  - Không có đối tượng `arguments` (nếu cần, dùng rest parameter `...args`).
  - Không thể dùng làm constructor (không thể gọi bằng `new`).
  - Không có prototype property.
  - Cú pháp cho implicit return (nếu thân là biểu thức, không cần `return` và không cần `{}`).

Ví dụ:

```javascript
const add = (a, b) => a + b;
const square = x => x * x;
const withBody = (x) => { const y = x + 1; return y * y; };
```

Khi nên dùng arrow function:
- Khi cần callback ngắn, không muốn thay đổi binding `this`.
- Khi không cần `this`, `arguments` hoặc `new`.

Khi không nên dùng:
- Khi định nghĩa method trên prototype/object mà bạn muốn `this` là object gọi phương thức.
- Khi cần làm constructor.


3) `this` trong arrow function

- Arrow function không có `this` riêng — nó sử dụng `this` từ lexical scope (scope chứa nó). Điều này giúp tránh `var self = this` hoặc `.bind(this)` trong nhiều trường hợp.

Ví dụ:

```javascript
function Counter() {
  this.count = 0;
  setInterval(() => {
    this.count++; // `this` ở đây là `this` của Counter
    console.log(this.count);
  }, 1000);
}
const c = new Counter();
```

Trong ví dụ trên, nếu dùng `function() { this.count++ }` thay arrow, `this` sẽ là global/undefined (tùy strict mode) hoặc context khác, nên không thao tác được `this.count` của Counter.

Lưu ý:
- Khi arrow function được dùng làm method (obj.method = () => { ... }), `this` sẽ không phải object `obj` mà là `this` từ scope bao quanh — thường không mong muốn.

Ví dụ lỗi phổ biến:

```javascript
const obj = {
  x: 10,
  getX: () => this.x // `this` ở đây không phải obj
};
console.log(obj.getX()); // undefined (hoặc giá trị khác tùy scope)
```


4) Default parameters

- Cú pháp: `function f(a = 1, b = a + 1) { ... }`
- Thứ tự: default expression được đánh giá tại thời điểm hàm được gọi, từ trái sang phải.
- Bạn có thể dùng tham số trước đó để tính tham số mặc định.

Ví dụ:

```javascript
function greet(name = 'Khách', greeting = `Xin chào, ${name}`) {
  return greeting;
}
console.log(greet()); // "Xin chào, Khách"
console.log(greet('An')); // "Xin chào, An"
```

Lưu ý:
- Nếu bạn truyền `undefined` cho tham số có default, default được áp dụng; nếu truyền `null` thì `null` là giá trị hợp lệ (không dùng default).


5) Rest parameter vs Spread operator

- Rest parameter (`...rest`) xuất hiện trong danh sách tham số của hàm và gom các tham số còn lại thành một mảng.
  - Ví dụ: `function f(a, ...rest) {}` => `rest` là Array gồm các phần tử sau `a`.

- Spread operator (`...iterable`) mở rộng một iterable (mảng, string, ... ) trong các ngữ cảnh như gọi hàm, array literal, object literal.
  - Ví dụ: `fn(...arr)` hoặc `[...arr, 4]` hoặc `{...obj2}`.

So sánh:
- Cùng một cú pháp `...` nhưng ngữ nghĩa khác tuỳ vị trí: trong parameter list => rest (thu thập), trong expression/list literal => spread (mở rộng).

Ví dụ:

```javascript
function sumAll(...nums) {
  return nums.reduce((s, x) => s + x, 0);
}
console.log(sumAll(1,2,3,4)); // 10

const arr = [1,2];
console.log([0, ...arr, 3]); // [0,1,2,3]
const copy = [...arr]; // shallow copy
```

Lưu ý với objects (ES2018+): spread object tạo shallow copy các enumerable own properties.


6) Callback là gì?

- Callback là một hàm được truyền vào một hàm khác như một tham số, để được gọi ("gọi lại") sau khi thực hiện xong công việc.
- Có callback đồng bộ (sync) và bất đồng bộ (async).

Ví dụ sync:

```javascript
function map(arr, fn) {
  const out = [];
  for (let i = 0; i < arr.length; i++) out.push(fn(arr[i], i));
  return out;
}
console.log(map([1,2,3], x => x * 2)); // [2,4,6]
```

Ví dụ async (error-first callback):

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

Lưu ý:
- Callback hell: khi có nhiều callback lồng nhau khiến code khó đọc. Thời nay dùng Promise/async-await để quản lý luồng bất đồng bộ.


7) Higher-order function (HOF)

- Hàm bậc cao là hàm nhận hàm làm tham số hoặc trả về một hàm.
- Ví dụ built-in: `Array.prototype.map`, `filter`, `reduce`.

Ví dụ:

```javascript
function repeat(n, fn) {
  for (let i = 0; i < n; i++) fn(i);
}

function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = makeAdder(5);
console.log(add5(3)); // 8
```

HOF là nền tảng cho lập trình hàm (functional programming) trong JS.


8) Currying

- Currying là quá trình biến một hàm có nhiều tham số thành một chuỗi các hàm từng nhận một tham số.
- Ví dụ: `f(a, b, c)` -> `f(a)(b)(c)`.
- Lợi ích: partial application (cố định một số tham số trước), tái sử dụng, compose dễ dàng hơn.

Ví dụ đơn giản:

```javascript
function curry3(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return fn(a, b, c);
      };
    };
  };
}

function sum3(a, b, c) { return a + b + c; }
const curried = curry3(sum3);
console.log(curried(1)(2)(3)); // 6
```

Một cách tổng quát hơn (support bất kỳ số arg):

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...more) {
      return curried.apply(this, args.concat(more));
    };
  };
}
```

Lưu ý:
- Currying khác với partial application nhưng hay bị nhầm lẫn — currying chuyển sang chuỗi các hàm; partial ứng dụng là cố định một vài tham số và trả về hàm mới.


9) Function composition

- Composition là ghép các hàm: compose(f, g)(x) = f(g(x)). Đây là pattern cơ bản của FP.
- `pipe` là compose theo chiều trái -> phải (gần giống chuỗi thao tác).

Ví dụ implement nhỏ:

```javascript
const compose = (f, g) => x => f(g(x));
const pipe = (f, g) => x => g(f(x));

const double = x => x * 2;
const inc = x => x + 1;
const incThenDouble = compose(double, inc);
console.log(incThenDouble(3)); // double(inc(3)) => 8
```

Lưu ý:
- Với nhiều hàm, compose có thể triển khai bằng reduce trên mảng các hàm.


10) IIFE (Immediately Invoked Function Expression)

- IIFE là một function expression được định nghĩa và gọi ngay lập tức.
- Cú pháp phổ biến:

```javascript
(function() { /* code */ })();
// hoặc
(function(x){ /* code */ })(42);

// Với arrow function
(() => { /* code */ })();
```

- Mục đích truyền thống:
  - Tạo scope cục bộ để tránh làm ô nhiễm global scope.
  - Tạo module pattern trước khi có ES modules.

Ví dụ:

```javascript
(function() {
  const local = 'chỉ trong IIFE';
  console.log(local);
})();
// console.log(local); // ReferenceError
```

Lưu ý: với ES modules (import/export) và block scope (`let/const`), nhu cầu dùng IIFE giảm. Tuy nhiên IIFE vẫn hữu ích để khởi tạo một khối ngay lập tức.

---

Tổng kết & mẹo nhanh
- Function declaration: hoisted; Function expression: gán vào biến.
- Arrow functions: lexical `this`, không có `arguments`, không thể làm constructor.
- Khi cần `this` là object gọi, dùng function normal; khi cần lexical `this`, hoặc callback ngắn, dùng arrow.
- Dùng default parameters để tránh kiểm tra `undefined` thủ công.
- `...` là rest khi ở param list, là spread khi ở expression.
- Callback là hàm được truyền để gọi lại; HOF làm việc với hàm — nền tảng của FP.
- Currying & composition giúp viết code tái sử dụng hơn; hiểu rõ `this` và số lượng args khi curry.
- IIFE giúp đóng scope khởi tạo ngay lập tức.

Bạn muốn tôi:
- Thêm file `functions_examples.js` với các ví dụ runnable để bạn `node` chạy thử? (Tôi có thể tạo và chạy nó.)
- Viết phiên bản tiếng Anh của file này?
- Rút gọn thành cheatsheet 1 trang?


