# Tổng quan chi tiết về các khái niệm cơ bản trong JavaScript

Tệp này trả lời chi tiết (bằng tiếng Việt) cho các câu hỏi:
- JavaScript là gì?
- Nó có phải là ngôn ngữ biên dịch không?
- Tại sao gọi là "loosely typed"?
- Kiểu dữ liệu nguyên thủy (primitive types) trong JS là gì?
- Kiểu dữ liệu tham chiếu (reference types) là gì?
- Phân biệt `undefined` và `null`.
- `typeof null` trả về gì?
- `typeof function` trả về gì?
- Sự khác biệt giữa `==` và `===`.
- Các trường hợp đặc biệt của `==`.

---

## 1. JavaScript là gì?
JavaScript là một ngôn ngữ lập trình cấp cao, đa-paradigm (hỗ trợ lập trình hướng đối tượng, hàm, và thủ tục), chủ yếu được dùng để tạo tính tương tác cho các trang web trên trình duyệt. JavaScript là một phần của bộ ba công nghệ web (HTML/CSS/JavaScript) và cũng được dùng trên phía máy chủ (server-side) nhờ môi trường chạy như Node.js.

Một số đặc điểm chính:
- Thực thi trong môi trường runtime (trình duyệt, Node.js).
- Hỗ trợ event-driven programming và asynchronous I/O (Promise, async/await, callbacks).
- Tiêu chuẩn hóa bởi ECMAScript (ES5, ES6/ES2015, ...).

## 2. JavaScript có phải là ngôn ngữ biên dịch không?
Không thể mô tả đơn giản là "chỉ biên dịch" hay "chỉ thông dịch" — về mặt lịch sử, JavaScript là ngôn ngữ thông dịch (interpreted): mã nguồn được đọc và thực thi bởi runtime (trình duyệt). Tuy nhiên, các engine JavaScript hiện đại (V8, SpiderMonkey, JavaScriptCore) dùng kỹ thuật JIT (Just-In-Time compilation): trước hoặc trong khi thực thi, engine sẽ biên dịch một phần mã nguồn thành mã máy để tối ưu hiệu suất.

Kết luận:
- Về mô hình triển khai: JavaScript là ngôn ngữ được runtime thực thi (interpreted), nhưng các engine dùng biên dịch JIT để tối ưu.

## 3. Tại sao gọi là "loosely typed" (hoặc "dynamically typed")?
Thuật ngữ "loosely typed" chỉ rằng JavaScript không bắt buộc phải gán kiểu tĩnh cho biến và kiểu dữ liệu có thể thay đổi trong thời gian chạy:

- Bạn không khai báo kiểu khi tạo biến (ví dụ: `let x = 5;`).
- Cùng một biến có thể chứa nhiều kiểu khác nhau trong các thời điểm khác nhau:

```javascript
let x = 10;   // number
x = "abc";   // string
x = { a: 1 }; // object
```

Điều này khác với "strongly typed" languages (như Java) nơi kiểu biến cố định. Cũng cần phân biệt "loosely typed" và "dynamically typed":
- "Dynamically typed" nghĩa là kiểu được xác định tại runtime.
- "Loosely typed" (hay weakly typed) nhấn mạnh khả năng coercion (ép kiểu tự động) khi so sánh/thực hiện phép toán, ví dụ: `"5" - 0` => `5`.

JavaScript được xem là both dynamically typed và weakly typed vì có coercion mạnh mẽ.

## 4. Kiểu dữ liệu nguyên thủy (primitive types) trong JavaScript là gì?
Tính đến ECMAScript hiện đại, JavaScript có các kiểu nguyên thủy sau:

1. `String` — chuỗi ký tự.
2. `Number` — số (double-precision 64-bit IEEE 754). Bao gồm NaN và +/-Infinity.
3. `BigInt` — số nguyên có độ lớn tùy ý (sử dụng hậu tố `n`, ví dụ `123n`).
4. `Boolean` — `true` hoặc `false`.
5. `Undefined` — biến được khai báo nhưng chưa gán giá trị; hoặc hàm không trả về giá trị rõ ràng.
6. `Null` — giá trị rỗng có chủ ý (explicitly no value).
7. `Symbol` — giá trị nguyên thủy duy nhất, thường dùng làm key độc nhất cho thuộc tính object.

Lưu ý:
- `Number` trong JS không phân biệt integer/float tại kiểu dữ liệu.
- `typeof null` trả về `"object"` do lỗi lịch sử (xem phần sau).

Ví dụ:
```javascript
typeof "hello";    // "string"
typeof 42;           // "number"
typeof 10n;          // "bigint"
typeof true;         // "boolean"
typeof undefined;    // "undefined"
typeof null;         // "object"  (lỗi lịch sử)
typeof Symbol("id"); // "symbol"
```

## 5. Kiểu dữ liệu tham chiếu (reference types) là gì?
Kiểu tham chiếu (reference types) là những giá trị phức tạp được lưu trữ theo tham chiếu (reference) tới vùng nhớ chứ không phải giá trị trực tiếp trong stack. Khi gán hoặc truyền vào hàm, reference được sao chép (tham chiếu tới cùng một object), không phải bản sao sâu.

Các ví dụ thường gặp:
- `Object` (đối tượng thuần) — { key: value }
- `Array` — mảng (trên thực tế là object với chỉ số số nguyên)
- `Function` — hàm (bản thân hàm cũng là một object callable)
- `Date`, `RegExp`, `Map`, `Set`, `WeakMap`, `WeakSet`, `ArrayBuffer`, v.v.

Ví dụ minh họa tham chiếu:
```javascript
let a = { x: 1 };
let b = a;
b.x = 2;
console.log(a.x); // 2
```

Phân biệt khi so sánh:
- So sánh object bằng `===` so sánh reference (cùng địa chỉ bộ nhớ).

```javascript
let tmp1 = {};
let tmp2 = {};
console.log(tmp1 === tmp2); // false (hai object khác nhau)
let o = {};
console.log(o === o);   // true
```

## 6. Phân biệt `undefined` và `null`

- `undefined`:
  - Là giá trị mặc định khi biến được khai báo nhưng chưa được gán giá trị.
  - Là giá trị trả về khi một hàm không có `return` hoặc khi truy cập vào thuộc tính không tồn tại.
  - Kiểu của `undefined` là `undefined`.

- `null`:
  - Đại diện cho "không có giá trị" và thường được gán một cách rõ ràng để biểu thị sự vắng mặt của giá trị.
  - Kiểu của `null` theo `typeof` là `"object"` (do lỗi lịch sử; thực tế `null` là primitive).

So sánh:
```javascript
let a;        // undefined
let b = null; // null

console.log(a == b);  // true  (vì == coi null và undefined là bằng nhau)
console.log(a === b); // false (khác loại)
```

Khi dùng trong API/thiết kế:
- Dùng `undefined` để chỉ "giá trị chưa được cung cấp".
- Dùng `null` khi muốn rõ ràng chỉ rằng "không có giá trị".

## 7. `typeof null` trả về gì?
`typeof null` trả về chuỗi "object".

Giải thích ngắn: đây là một lỗi lịch sử từ phiên bản đầu của JavaScript — `null` được lưu dưới dạng một null pointer với nhãn 0 trong một số triển khai ban đầu, và `typeof` lẽ ra phải trả về "null" nhưng đã trả về "object". Lỗi này không được sửa để giữ tính tương thích ngược.

Ví dụ:
```javascript
console.log(typeof null); // "object"
```

Nếu bạn cần kiểm tra chính xác `null`, dùng so sánh trực tiếp:
```javascript
value === null
```

## 8. `typeof function` trả về gì?
`typeof` một hàm trả về chuỗi "function".

Ví dụ:
```javascript
function f() {}
console.log(typeof f); // "function"

const g = () => {};
console.log(typeof g); // "function"
```

Lưu ý: Mặc dù `typeof` trả về "function", về mặt khái niệm thì Function là một object đặc biệt (callable) — tức là các hàm vẫn là reference types.

## 9. Sự khác biệt giữa `==` và `===`

- `===` (strict equality): so sánh cả kiểu và giá trị, không thực hiện ép kiểu (type coercion). Nếu kiểu khác nhau thì kết quả là `false` (ngoại trừ một số trường hợp đặc biệt như NaN).

- `==` (abstract/loose equality): trước khi so sánh, thực hiện một loạt các quy tắc ép kiểu theo thứ tự định nghĩa trong ECMAScript (ToPrimitive, ToNumber, ToString, ToBoolean...), rồi so sánh giá trị.

Một vài ví dụ:
```javascript
0 == false      // true  (false -> 0)
0 === false     // false (number vs boolean)
"5" == 5       // true  ("5" -> 5)
"5" === 5      // false
null == undefined // true
null === undefined // false
```

Chi tiết ngắn về quy trình `==` (rất tóm tắt):
1. Nếu hai giá trị cùng kiểu thì so sánh bằng `===`.
2. Nếu một trong hai là `null` và cái kia là `undefined`, trả về `true`.
3. Nếu một là number và một là string, convert string -> number rồi so sánh số.
4. Nếu một là boolean, convert boolean -> number rồi so sánh.
5. Nếu một là object và một là primitive (string/number/symbol/bigint), convert object -> primitive (gọi `valueOf` hoặc `toString` theo quy tắc) rồi so sánh tiếp.
6. Trong nhiều trường hợp khác, trả về `false`.

Vì quy tắc ép kiểu có nhiều tình huống khó đoán, khuyến nghị dùng `===` để tránh lỗi logic bất ngờ.

## 10. Các trường hợp đặc biệt của `==`
Dưới đây là các trường hợp hay gây nhầm lẫn hoặc quan trọng để hiểu cách `==` hoạt động, kèm ví dụ và lý giải:

1) `null` và `undefined`:
```javascript
null == undefined   // true
null == 0           // false
undefined == 0      // false
```
- `null` chỉ bằng `undefined` khi dùng `==`, nhưng không bằng các giá trị khác.

2) Chuỗi và số:
```javascript
"0" == 0      // true
"\t\n" == 0 // true (chuỗi whitespace -> 0 khi ToNumber)
"" == 0       // true
"" == false   // true ("" -> 0, false -> 0)
" " == 0      // true (space -> 0)
```
- Khi so sánh string với number, string được chuyển sang number (`ToNumber`).

3) Boolean với number/chuỗi:
```javascript
true == 1     // true (true -> 1)
false == 0    // true (false -> 0)
"1" == true // true (true -> 1, "1" -> 1)
```
- Boolean được convert sang number (true -> 1, false -> 0) trước khi so sánh.

4) Object vs primitive (Array/Date/Object -> ToPrimitive):
```javascript
[1] == 1          // true   ([1].toString() -> "1" -> 1)
[1,2] == "1,2"  // true   ([1,2].toString() -> "1,2")
[] == ""        // true   ([].toString() -> "")
[] == 0          // true   ([] -> "" -> 0)
[0] == 0         // true
["\n"] == 0    // true
```
- Object được convert sang primitive bằng quy tắc ToPrimitive: gọi `valueOf()` rồi `toString()` (tùy hint). Với Array, `toString()` nối các phần tử bằng dấu phẩy.

5) NaN:
```javascript
NaN == NaN // false
```
- NaN không bằng chính nó theo IEEE 754. Dùng `Number.isNaN()` hoặc `Object.is()` để kiểm tra NaN.

6) So sánh object với object:
```javascript
{} == {} // false (không cùng tham chiếu)
```
- So sánh object bằng reference, không phải bằng nội dung.

7) Empty array / empty string / false:
```javascript
[] == false   // true
"" == false // true
[] == ""    // true
```
- Vì `[] -> ""` và `false -> 0`, chuỗi rỗng -> 0, do đó `[] == false` là true.

8) Dấu cách và chuỗi whitespace:
```javascript
" \t\n" == 0 // true
```
- Chuỗi chỉ chứa whitespace khi ToNumber sẽ chuyển thành 0.

9) BigInt và Number (từ ES2020):
- Khi so sánh `number == bigint`, nếu number là NaN -> false; nếu number là +/-Infinity -> false; nếu number là integer có thể biểu diễn chính xác thì so sánh theo giá trị, còn lại sẽ thực hiện các quy tắc chuyển đổi (coercion khác biệt). Ví dụ:
```javascript
1n == 1   // true
1n === 1  // false
```
10) Symbol:
- Symbol không thể ép sang Number hoặc String bằng ToNumber/ToString (trừ khi gọi explicit `String(sym)`) — cố ép kiểu sẽ ném TypeError trong một số phép toán.

11) Dates:
```javascript
new Date(0) == 0 // true (Date -> primitive bằng valueOf() -> 0)
```

12) Tổng quát về object -> primitive:
- Khi so sánh object với primitive, engine gọi ToPrimitive(obj, hint) — thứ tự gọi các phương thức khác nhau tùy hint (number/string).
  - Với Arrays, `toString()` thường được dùng.
  - Với Date, `toString()` không phải là hint mặc định; Date ưu tiên `toString()`/`valueOf()` theo quy tắc của Date.

---

### Mẹo thực hành và khuyến nghị
- Dùng `===` và `!==` cho hầu hết so sánh trừ khi bạn hiểu rõ coercion.
- Dùng `Object.is()` khi cần phân biệt +0 và -0 hoặc nhận diện NaN (`Object.is(NaN, NaN)` là true).
- Khi so sánh giá trị phức tạp (object/array), so sánh các thuộc tính cần thiết hoặc serialise (ví dụ `JSON.stringify`) nếu phù hợp.
- Tránh relying vào các quy tắc coercion phức tạp của `==` — chúng dễ gây lỗi logic.

---

Nếu bạn muốn, tôi có thể:
- Thêm nhiều ví dụ chạy thực tế (các snippet có thể paste vào console).
- Tạo một file `examples.js` để bạn có thể chạy và quan sát kết quả ngay.
