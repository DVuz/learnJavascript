# Mô tả chi tiết về mô hình thực thi và khái niệm nền tảng trong JavaScript (Tiếng Việt)

Tệp này trả lời chi tiết cho các câu hỏi:
- Hoisting là gì?
- Temporal Dead Zone (TDZ) là gì?
- So sánh `var`, `let`, `const`.
- `const` có nghĩa là immutable (bất biến) không?
- JavaScript là single-threaded nghĩa là gì?
- Execution context là gì?
- Global object trong trình duyệt và Node.js là gì?
- Call stack là gì?
- Event loop là gì?
- Stack overflow xảy ra khi nào?

---

## 1. Hoisting là gì?
Hoisting là hành vi của JavaScript trong đó khai báo biến và khai báo hàm (function declarations) được "nâng" lên (hoisted) lên đỉnh phạm vi (scope) hiện tại trước khi mã thực thi. Điều này không có nghĩa là giá trị được khởi tạo; mà là bản thân khai báo (tên biến hoặc tên hàm) được tạo sẵn trong môi trường thực thi.

- Với `function` declaration (ví dụ `function f(){}`), toàn bộ hàm được hoisted (tên và phần thân), nên bạn có thể gọi hàm trước khi định nghĩa trong mã.

```javascript
console.log(typeof f); // "function"
console.log(f());      // hoạt động
function f(){ return 'ok'; }
```

- Với `var`, tên biến được hoisted và khởi tạo bằng `undefined` trước khi chạy; gán giá trị vẫn xảy ra tại chỗ. Do đó, truy cập biến `var` trước khi gán trả về `undefined`, không ném lỗi.

```javascript
console.log(a); // undefined
var a = 10;
```

- Với `let` và `const`, tên biến cũng được ghi nhận sớm trong phạm vi nhưng không được khởi tạo — chúng nằm trong Temporal Dead Zone (TDZ) cho đến khi điểm khởi tạo thực sự được chạy (xem phần 2). Truy cập trước khi khai báo với `let`/`const` sẽ ném `ReferenceError`.

---

## 2. Temporal Dead Zone (TDZ) là gì?
Temporal Dead Zone (TDZ) là khoảng thời gian giữa lúc bắt đầu phạm vi (ví dụ bắt đầu khối `{}` hoặc function) và điểm thực thi nơi biến `let`/`const` được khởi tạo. Trong khoảng này, biến tồn tại về mặt ngữ nghĩa (engine biết tên biến), nhưng chưa thể truy cập — truy cập sẽ gây `ReferenceError`.

Ví dụ:

```javascript
{
  // TDZ cho `x` bắt đầu ở đây
  // console.log(x); // ReferenceError
  let x = 5; // sau khi thực hiện dòng này, x được khởi tạo
  console.log(x); // 5
}
```

TDZ giúp phát hiện lỗi logic (ví dụ dùng biến trước khi gán) và là một trong những lý do `let`/`const` an toàn hơn `var`.

---

## 3. So sánh `var`, `let`, `const`
Tóm tắt khác biệt quan trọng:

- Phạm vi (Scope):
  - `var` có *function scope* (hoặc global nếu khai báo ở ngoài function).
  - `let` và `const` có *block scope* (phạm vi trong cặp `{}`).

- Hoisting / TDZ:
  - `var` được hoisted và khởi tạo bằng `undefined` — truy cập sớm trả `undefined`.
  - `let`/`const` được hoisted nhưng không khởi tạo; nằm trong TDZ => truy cập sớm ném `ReferenceError`.

- Gán lại (reassignment) và tái khai báo (redeclaration):
  - `var` cho phép redeclare trong cùng scope và reassignment.
  - `let` cho phép reassignment nhưng không cho redeclare trong cùng scope.
  - `const` không cho phép reassignment và không cho redeclare trong cùng scope.

- `const` yêu cầu phải có initializer (giá trị khởi tạo) khi khai báo.

Ví dụ:

```javascript
function demo(){
  var v = 1;
  var v = 2; // hợp lệ

  let l = 1;
  // let l = 2; // SyntaxError: Identifier 'l' has already been declared

  const c = 1;
  // c = 2; // TypeError: Assignment to constant variable.
}
```

---

## 4. `const` có nghĩa là immutable không?
Không hẳn. `const` nghĩa là tên biến (binding) không thể được gán lại (no reassignment) — binding là cố định. Nhưng nếu giá trị là một object (bao gồm mảng, hàm), nội dung của object đó vẫn có thể thay đổi (mutable).

Ví dụ:

```javascript
const a = { x: 1 };
a.x = 2; // hợp lệ, thay đổi thuộc tính
// a = { x: 3 } // lỗi: không thể gán lại binding

const arr = [1,2];
arr.push(3); // hợp lệ
```

Nếu bạn cần object bất biến hoàn toàn, dùng các kỹ thuật như `Object.freeze()` (nông), hoặc thư viện bất biến (Immutable.js), hoặc patterns ghi nhận giá trị mới thay vì thay đổi.

---

## 5. JavaScript là single-threaded nghĩa là gì?
Nói JavaScript là "single-threaded" có nghĩa là runtime JavaScript (các task thực thi mã JS) sẽ chạy trên một luồng thực thi chính (main thread) — chỉ một đoạn mã JS được chạy tại một thời điểm trên ngữ cảnh đó. Điều này làm cho mô hình đồng bộ (synchronous) đơn giản hơn: không có data race giữa các đoạn mã JS cùng thời điểm.

Tuy nhiên, môi trường (như trình duyệt hoặc Node.js) có thể thực hiện các công việc I/O, timers, rendering, hay tác vụ nền trên các luồng khác (C++/OS threads) bên ngoài, rồi trả kết quả về vòng lặp sự kiện (event loop) để callback được chạy trên main thread.

Hậu quả:
- Các tác vụ I/O không khóa luồng JS chính; chúng được xử lý bất đồng bộ và callback/microtask sẽ chạy khi hoàn tất.
- Nếu một tác vụ JS chạy lâu (CPU-bound), nó sẽ block main thread, gây UI lag trên trình duyệt hoặc block event handling.

---

## 6. Execution Context là gì?
Execution context (ngữ cảnh thực thi) là một khối thông tin mà engine tạo ra mỗi khi thực thi một đoạn mã (ví dụ khi chạy global code, gọi function, hoặc dùng `eval`). Execution context chứa ít nhất ba phần chính:

1. Variable Environment (môi trường biến) — nơi lưu các khai báo biến, hàm, tham chiếu đến outer environment (lexical environment).
2. Lexical Environment (môi trường ngữ nghĩa) — bao gồm môi trường biến và tham chiếu tới `outer` (scope chain) phục vụ lookup biến theo chuỗi phạm vi.
3. This binding — giá trị `this` cho context hiện tại.

Mỗi khi gọi function, một execution context mới được tạo và push vào call stack. Khi function hoàn thành, context đó bị pop.

Hai loại execution context phổ biến:
- Global execution context — cho mã chạy ở cấp toàn cục (một instance duy nhất cho toàn chương trình).
- Function execution context — cho mỗi lần gọi hàm.

Ngoài ra còn có `Eval` context (ít dùng) và module context (ES modules có cơ chế riêng về scope và hoisting một chút khác).

---

## 7. Global object trong trình duyệt và Node.js là gì?
Global object là đối tượng toàn cục chứa các biến/hàm ở phạm vi toàn cục (global scope) và các API môi trường.

- Trong trình duyệt: global object là `window` (còn `self` trong WebWorker, `globalThis` là chuẩn chung). Biến global khai báo bằng `var foo = 1;` sẽ trở thành `window.foo`, còn `let/const` không tạo property trên `window`.

```javascript
var a = 1;
let b = 2;
console.log(window.a); // 1
console.log(window.b); // undefined
```

- Trong Node.js: global object là `global`. Tuy nhiên khi sử dụng module (CommonJS/ESM), code được bọc trong module scope; biến từ `var`/`let`/`const` trong module không tự động gắn vào `global`. `globalThis` là chuẩn dùng chung để truy cập global object trên mọi môi trường.

```javascript
console.log(global === globalThis); // true (trong Node)
```

---

## 8. Call stack là gì?
Call stack (ngăn xếp gọi hàm) là cấu trúc dữ liệu LIFO do engine sử dụng để quản lý các execution context đang chạy. Khi một hàm được gọi, execution context của nó được push vào stack; khi hàm kết thúc, context bị pop.

Ví dụ:

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

Dòng thời gian call stack:
- Global context (đã push khi chương trình bắt đầu)
- gọi `a()` -> push context `a`
- `a` gọi `b()` -> push context `b`
- `b` gọi `c()` -> push context `c`
- `c` hoàn tất -> pop `c`
- `b` hoàn tất -> pop `b`
- `a` hoàn tất -> pop `a`

Call stack cũng liên quan đến stack overflow: nếu push quá nhiều context (ví dụ recursion vô hạn), stack sẽ vượt giới hạn.

---

## 9. Event Loop là gì?
Event loop là cơ chế điều phối giữa call stack và các hàng đợi tác vụ (task queues) — đảm bảo rằng callback bất đồng bộ (timers, I/O, events, promise callbacks) được thực thi khi call stack rỗng.

Sơ đồ đơn giản:
1. Call stack thực thi mã đồng bộ.
2. Các tác vụ bất đồng bộ (I/O, setTimeout, DOM events, ...), khi hoàn tất, sẽ đặt callback vào hàng đợi thích hợp (macrotask queue hoặc microtask queue).
3. Event loop liên tục kiểm tra: khi call stack rỗng, nó lấy và thực thi các microtasks trước (ví dụ callbacks của Promise `.then`/`catch`/`finally` và queue microtask), sau đó lấy một macrotask (ví dụ callback `setTimeout`, I/O callbacks) và đẩy nó vào call stack để thực thi.

Ưu tiên: microtasks (promise jobs) luôn chạy trước khi event loop lấy macrotask tiếp theo.

Ví dụ để minh họa thứ tự:

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

Giải thích:
- `script start` và `script end` chạy ngay trên call stack.
- `Promise` callback là microtask -> được chạy sau khi call stack rỗng nhưng trước macrotask.
- `setTimeout` callback là macrotask -> chạy sau microtasks.

Event loop là lý do khiến JavaScript có thể xử lý I/O bất đồng bộ mà vẫn giữ mô hình single-threaded rõ ràng.

---

## 10. Stack overflow xảy ra khi nào?
Stack overflow xảy ra khi call stack bị đầy (vượt giới hạn tối đa do engine) — thường do recursion quá sâu hoặc vòng lặp gọi hàm không dừng.

Ví dụ phổ biến:

```javascript
function f(){
  f(); // gọi chính nó liên tục
}
f();
// Kết quả: RangeError: Maximum call stack size exceeded (hoặc tương tự)
```

Các nguyên nhân:
- Recursion không có điều kiện dừng.
- Chuỗi cuộc gọi hàm sâu (deep call chain) vượt quá giới hạn stack của engine.

Cách tránh:
- Kiểm tra điều kiện dừng trong recursion.
- Sử dụng các giải pháp thay thế không sử dụng stack sâu: chuyển sang loop, dùng kỹ thuật tail-call optimization (TCO) nếu engine hỗ trợ (hiếm), hoặc dùng thiết kế phân chia công việc (chunking) để không chồng nhiều frame liên tiếp.

---

### Mẹo & tóm tắt nhanh
- Dùng `let`/`const` thay vì `var` để tránh các lỗi liên quan hoisting và scope.
- Dùng `const` cho binding không thay đổi; nếu cần immutable data, dùng `Object.freeze()` hoặc pattern immutable.
- Hiểu event loop và phân biệt macrotask vs microtask để tránh lỗi về thứ tự thực thi.
- Tránh phép tính/công việc CPU-bound dài trên main thread để không làm block UI.
- Khi gặp `ReferenceError` liên quan TDZ, kiểm tra xem bạn có dùng `let`/`const` trước khi khai báo không.

---

Nếu bạn muốn, tôi có thể:
- Thêm các ví dụ có thể chạy trực tiếp (file `examples.js`) để bạn dán vào console/Node và quan sát.
- Thêm bản tiếng Anh của cùng nội dung.
- Viết các đoạn test nhỏ để chứng minh hành vi hoisting/TDZ/event loop.


