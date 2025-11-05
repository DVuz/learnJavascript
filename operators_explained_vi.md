# Giải thích các toán tử và khái niệm liên quan trong JavaScript (Tiếng Việt)

Tài liệu này giải thích chi tiết các mục bạn yêu cầu: NaN, isNaN(), Number.isNaN(), ++i vs i++, toán tử bitwise, typeof vs instanceof, toán tử `in`, `delete`, `void`, toán tử `??` so với `||`, và optional chaining `?.`.

Mục lục
- NaN là gì?
- isNaN() và Number.isNaN() khác nhau thế nào?
- Sự khác biệt giữa ++i và i++
- Toán tử bitwise trong JS có dùng nhiều không? (và lưu ý)
- Toán tử typeof khác gì với instanceof
- Toán tử `in` dùng để làm gì?
- Toán tử `delete` dùng để làm gì?
- Toán tử `void` làm gì?
- Toán tử `??` khác gì `||`?
- Optional chaining (?.) là gì?
- Tổng kết & mẹo nhanh

---

1) NaN là gì?

- NaN là viết tắt của "Not-a-Number". Đây là một giá trị đặc biệt trong IEEE-754 floating point được JavaScript sử dụng để biểu diễn kết quả của các phép toán số không hợp lệ (ví dụ 0/0, parse lỗi, toán tử số với chuỗi không thể chuyển sang số).
- Một điểm quan trọng: NaN không bằng chính nó. (NaN !== NaN)

Ví dụ:

```javascript
console.log(0 / 0); // NaN
console.log(Number('abc')); // NaN
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true — để kiểm tra NaN chính xác
```

Để kiểm tra một giá trị có phải NaN hay không, dùng Number.isNaN() (xem dưới) hoặc Object.is.


2) isNaN() và Number.isNaN() khác nhau thế nào?

- isNaN(value): chuyển (coerce) giá trị sang Number trước khi kiểm tra. Nếu giá trị sau khi chuyển là NaN, hàm trả true. Vì có coercion nên một số chuỗi hay giá trị khác có thể trả true/false bất ngờ.
- Number.isNaN(value): không thực hiện coercion — chỉ trả true khi giá trị chính xác là NaN (kiểu số NaN). Đây là an toàn hơn và nên dùng khi bạn muốn kiểm tra thật sự NaN.

Ví dụ minh hoạ:

```javascript
console.log(isNaN('foo')); // true  -> 'foo' coerces to NaN
console.log(Number.isNaN('foo')); // false -> 'foo' không phải NaN kiểu Number

console.log(isNaN('')); // false -> '' coerces to 0
console.log(Number.isNaN('')); // false

console.log(isNaN(NaN)); // true
console.log(Number.isNaN(NaN)); // true
```

Lời khuyên: ưu tiên dùng Number.isNaN() khi bạn cần kiểm tra chính xác NaN.


3) Sự khác biệt giữa ++i và i++

- ++i (pre-increment): tăng i trước, rồi trả về giá trị đã tăng.
- i++ (post-increment): trả về giá trị hiện tại của i, sau đó mới tăng i.

Ví dụ:

```javascript
let i = 1;
console.log(++i); // 2  (i thành 2, trả về 2)

i = 1;
console.log(i++); // 1  (trả về 1, sau đó i thành 2)
console.log(i); // 2
```

Dùng trong biểu thức phức tạp:

```javascript
let a = 1;
let b = a++ + 2; // b = 1 + 2 = 3, a -> 2
let c = ++a + 2; // a -> 3, c = 3 + 2 = 5
```

Lời khuyên: tránh viết biểu thức phức tạp dùng ++/-- khi giá trị và tác dụng phụ gây khó hiểu — tách ra thành các dòng rõ ràng.


4) Toán tử bitwise trong JS có dùng nhiều không?

Danh sách chính: &, |, ^, ~, <<, >>, >>>.

- JavaScript biểu diễn số theo IEEE-754 double (floating point). Khi dùng toán tử bitwise, engine sẽ chuyển (ToInt32) giá trị sang 32-bit signed integer, thực hiện phép toán bit, rồi trả về kết quả cũng dưới dạng Number (nhưng giá trị nguyên 32-bit được duy trì trong phạm vi số JS).

- Ứng dụng phổ biến:
  - Làm thao tác trên cờ (flags) hoặc mask.
  - Chuyển đổi nhanh sang số nguyên 32-bit: x | 0 (cắt phần thập phân, tương đương truncate), nhưng cần thận trọng vì giới hạn 32-bit.
  - Một vài tối ưu cổ điển (nhưng không phải luôn luôn cần thiết) như Math.floor(x) cho số dương có thể thay bằng x|0 (nhưng x|0 chỉ an toàn trong phạm vi 32-bit và với số dương/âm khác nhau về cách làm tròn).

- Nhược điểm / lưu ý:
  - Chỉ hoạt động trên 32-bit signed integers — mất dữ liệu nếu bạn mong đợi chính xác 64-bit integers.
  - Dễ gây lỗi khi dùng với số lớn, số âm, hoặc NaN/Infinity.
  - Với các engine hiện đại, lợi ích hiệu năng nhỏ và khó đọc — chỉ dùng khi thực sự cần bitwise logic.

Ví dụ:

```javascript
console.log(5 & 3); // 1 (0101 & 0011 = 0001)
console.log(5 | 2); // 7 (0101 | 0010 = 0111)
console.log(~0); // -1 (bitwise NOT)

console.log(1.9 | 0); // 1 (cắt phần thập phân)
console.log(-1 >>> 0); // 4294967295 (chuyển sang unsigned 32-bit)
```

Kết luận: dùng khi bạn cần thao tác bit-level (flags, mask, bit math) hoặc cần thủ thuật chuyển sang int32; không dùng cho toán học bình thường.


5) Toán tử typeof khác gì với instanceof

- typeof operator trả về một chuỗi mô tả kiểu nguyên thủy (primitive) hoặc nhóm kiểu:
  - typeof 123 -> "number"
  - typeof 's' -> "string"
  - typeof true -> "boolean"
  - typeof undefined -> "undefined"
  - typeof Symbol() -> "symbol"
  - typeof function(){} -> "function"
  - typeof {} -> "object"
  - typeof null -> "object" (đây là một legacy quirk — lưu ý)

- instanceof kiểm tra xem một object có nằm trong prototype chain của một hàm tạo (constructor) hay không. Dùng để kiểm tra kiểu tham chiếu theo prototype.

Ví dụ:

```javascript
console.log(typeof []); // "object"
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log((function() {}) instanceof Function); // true

console.log(typeof null); // "object"
console.log(null instanceof Object); // false
```

Lưu ý:
- typeof phù hợp để kiểm tra primitive types và để khác biệt function vs object.
- instanceof chỉ áp dụng cho object (reference) và phụ thuộc vào prototype chain — có thể sai khi kiểm tra giữa các frame/iframe (nếu một Array được tạo trong frame khác, instanceof Array có thể trả false).


6) Toán tử `in` dùng để làm gì?

- Cú pháp: "propName" in object
- Trả true nếu object (hoặc prototype chain của object) có thuộc tính với tên đó.

Ví dụ:

```javascript
const obj = { a: 1 };
console.log('a' in obj); // true
console.log('toString' in obj); // true (from prototype)

const arr = [10, 20];
console.log(0 in arr); // true (index 0 tồn tại)
console.log(2 in arr); // false
```

`in` hữu ích để phân biệt giữa "không có thuộc tính" và "có thuộc tính nhưng giá trị là undefined".

```javascript
const o = { a: undefined };
console.log(o.a === undefined); // true
console.log('a' in o); // true  -> thuộc tính tồn tại
console.log('b' in o); // false -> thuộc tính không tồn tại
```


7) Toán tử `delete` dùng để làm gì?

- `delete obj.prop` xóa thuộc tính khỏi object (nếu thuộc tính configurable). Trả về true nếu thành công hoặc thuộc tính không tồn tại; trả false trong non-strict mode khi không thể xóa do thuộc tính non-configurable (trong strict mode có thể ném TypeError?).

Ví dụ:

```javascript
const o = { a: 1 };
delete o.a;
console.log('a' in o); // false

const a = [1,2,3];
delete a[1];
console.log(a); // [1, <1 empty item>, 3]
console.log(a.length); // 3 (không thay đổi length)
```

Lưu ý:
- `delete` chỉ xóa thuộc tính, không xóa biến được khai báo bằng var/let/const trong scope hiện tại.
- Với biến global khai báo bằng var, delete không xóa (trong strict module environment). Tuy nhiên xóa property trên global object thì được nếu là configurable.


8) Toán tử `void` làm gì?

- `void <expression>` sẽ thực thi biểu thức nhưng luôn trả về undefined. Dùng khi bạn cần đảm bảo giá trị trả về là undefined.
- Ứng dụng phổ biến: trong bookmarklet (javascript: void(0)) để tránh trang điều hướng; hoặc khi bạn muốn gọi hàm trong một ngữ cảnh biểu thức nhưng bỏ qua giá trị trả về.

Ví dụ:

```javascript
console.log(void 0); // undefined
console.log(void (someFunction())); // thực thi someFunction() nhưng kết quả của biểu thức là undefined
```

Lưu ý: trước đây các đoạn `javascript:` trong bookmark thường dùng `void(0)` để ngăn trang web điều hướng.


9) Toán tử `??` khác gì `||`?

- `a ?? b` (nullish coalescing) trả `a` nếu `a` không phải `null` hoặc `undefined`; nếu `a` là `null` hoặc `undefined` thì trả `b`.
- `a || b` trả `a` nếu `a` là truthy; nếu `a` falsy (0, '', false, NaN, null, undefined) thì trả `b`.

Vì vậy, `??` chỉ coi null và undefined là "thiếu giá trị", trong khi `||` coi nhiều giá trị khác (0, '', false) là thiếu.

Ví dụ:

```javascript
const x = 0;
console.log(x || 42); // 42  (vì 0 là falsy)
console.log(x ?? 42); // 0   (vì 0 không phải null/undefined)

const s = '';
console.log(s || 'default'); // 'default'
console.log(s ?? 'default'); // ''
```

Lưu ý: không nên kết hợp `??` trực tiếp với `||` hoặc `&&` mà không dùng ngoặc do quy tắc precedence; trình phân tích cú pháp ES2020 yêu cầu dùng ngoặc nếu cần phối hợp.


10) Optional chaining (?.) là gì?

- Optional chaining `?.` cho phép truy cập an toàn vào thuộc tính nested, gọi hàm hoặc dùng bracket mà không ném lỗi nếu phần ở giữa là null hoặc undefined. Nếu phần trước `?.` là null/undefined, biểu thức trả undefined thay vì ném TypeError.

Các dạng sử dụng:

- Truy cập thuộc tính: obj?.prop
- Truy cập thuộc tính động: obj?.[expr]
- Gọi hàm: obj?.method()

Ví dụ:

```javascript
const o = { a: { b: 1 }, f: () => 3 };
console.log(o?.a?.b); // 1
console.log(o?.x?.y); // undefined (không ném lỗi)
console.log(o?.f?.()); // 3

const maybeFunc = null;
console.log(maybeFunc?.()); // undefined (không ném error)
```

Lưu ý:
- Optional chaining chỉ kiểm tra `null` hoặc `undefined`. Nếu thuộc tính tồn tại nhưng là khác (ví dụ false, 0, ''), nó vẫn trả giá trị đó.
- Bạn có thể kết hợp với `??` để cung cấp mặc định:

```javascript
console.log(o?.x ?? 'default');
```

---

Tổng kết & mẹo nhanh:
- Dùng Number.isNaN để kiểm tra NaN chính xác; Object.is cũng đáng cân nhắc.
- Tránh dùng ++/-- trong biểu thức phức tạp — làm rõ ràng bằng gán tách dòng.
- Bitwise hữu ích cho thao tác flags hoặc chuyển nhanh sang int32, nhưng cẩn trọng với giới hạn 32-bit.
- typeof dùng để kiểm tra primitive types; instanceof dùng để kiểm tra prototype chain cho objects.
- `in` kiểm tra sự tồn tại thuộc tính (bao gồm prototype), `delete` xóa thuộc tính (không xóa biến cục bộ).
- `void` trả về undefined (thường ít dùng ngoại trừ tình huống đặc biệt như bookmarklet).
- `??` chỉ coi null/undefined là thiếu — dùng khi 0/''/false là giá trị hợp lệ.
- Optional chaining `?.` giúp tránh TypeError khi truy cập sâu vào object không chắc chắn.

Nếu bạn muốn, tôi có thể:
- Thêm một file `examples.js` với tập lệnh để bạn chạy nhanh trong Node/console để thấy các ví dụ.
- Viết phiên bản tiếng Anh của tài liệu này.
- Rút gọn thành một cheatsheet 1 trang để in.

