// File: d:\Learn\Javascript\function\RestAndSpreadTheory.js
// Mục tiêu: Tập trung lý thuyết về REST và SPREAD trong JavaScript
// Ngôn ngữ: Tiếng Việt
// Nội dung: Giải thích ngắn gọn, quy tắc, ví dụ chạy được, lưu ý, và tóm tắt.

// =====================================================
// TỔNG QUAN NGẮN
// =====================================================
// REST và SPREAD đều dùng cùng cú pháp ba dấu chấm: ...
// - REST: "thu thập" nhiều giá trị thành một (thường là mảng hoặc object) — chỉ dùng ở danh sách tham số hoặc destructuring.
// - SPREAD: "mở rộng" một iterable/object thành các phần tử/rất nhiều thuộc tính riêng lẻ — dùng trong biểu thức (calls, array literals, object literals).

// =====================================================
// 1) REST PARAMETER (tham số rest)
// =====================================================
// - Cú pháp: function foo(a, b, ...rest) { }
// - REST chỉ xuất hiện ở cuối danh sách tham số. Nếu không ở cuối => SyntaxError.
// - REST tạo một mảng (Array) chứa các tham số còn lại.
// - REST được dùng cả trong array/object destructuring để lấy phần còn lại.

// Ví dụ: REST trong function parameters
function sumAll(...numbers) {
  // numbers là mảng chứa tất cả các đối số được truyền vào
  return numbers.reduce((s, n) => s + n, 0);
}
console.log('sumAll(1,2,3) =>', sumAll(1, 2, 3)); // 6

// Ví dụ: Kết hợp tham số cố định và rest
function greet(greeting, ...names) {
  // greeting: string đầu
  // names: mảng tên
  return `${greeting} ${names.join(', ')}`;
}
console.log(greet('Xin chào', 'An', 'Bình'));

// Ví dụ: REST trong destructuring (array)
const numbers = [10, 20, 30, 40];
const [first, ...restOfNumbers] = numbers;
console.log('first =', first); // 10
console.log('restOfNumbers =', restOfNumbers); // [20,30,40]

// Ví dụ: REST trong destructuring (object)
const obj = { a: 1, b: 2, c: 3 };
const { a, ...others } = obj; // others là object { b:2, c:3 }
console.log('a =', a);
console.log('others =', others);

// =====================================================
// 2) SPREAD OPERATOR
// =====================================================
// - Cú pháp: foo(...iterable) hoặc [...arr] hoặc { ...obj }
// - SPREAD dùng để "mở" một iterable (Array, String, Map, Set...) thành các phần tử riêng
// - Trong object literal (ES2018+), spread sao chép các enumerable own properties (shallow copy)

// Ví dụ: SPREAD trong function call
const arr = [1, 2, 3];
console.log('Math.max(...arr) =>', Math.max(...arr)); // tương đương Math.max(1,2,3)

// Sao chép mảng (shallow copy)
const copy = [...arr];
console.log('copy === arr ?', copy === arr); // false

// Nối mảng
const combined = [...arr, 4, 5, ...[6, 7]];
console.log('combined =', combined);

// Sao chép object và override
const defaults = { theme: 'light', lang: 'vi' };
const user = { lang: 'en' };
const settings = { ...defaults, ...user, version: 1 };
console.log('settings =', settings); // lang sẽ là 'en'

// =====================================================
// 3) SO SÁNH NHANH: REST vs SPREAD
// =====================================================
// - REST thu thập -> tạo 1 giá trị chứa nhiều thứ (ví dụ: mảng), dùng trong params/destructuring.
// - SPREAD mở rộng -> phân rã 1 cấu trúc thành nhiều phần tử/thuộc tính, dùng trong expression.
// - Cùng biểu hiện ... nhưng ngữ cảnh quyết định.

// Ví dụ minh họa: REST thu thập, SPREAD mở rộng
function demo(first, ...rest) {
  // rest ở đây là REST (một mảng)
  console.log('REST (mảng) =', rest);
  // dùng SPREAD để truyền mảng thành các arg cho sumAll
  console.log('SUM of rest =', sumAll(...rest));
}
demo('label', 5, 6, 7);

// =====================================================
// 4) LƯU Ý & QUY TẮC
// =====================================================
// - REST phải ở cuối danh sách tham số: function foo(a, ...rest) {}
// - REST không phải là một tính năng của Array.prototype: nó là cú pháp ngôn ngữ tạo ra mảng.
// - SPREAD thực hiện shallow copy: các object lồng nhau vẫn tham chiếu cùng đối tượng.
// - Trong object spread, thuộc tính sau cùng sẽ override thuộc tính trước nếu có cùng tên.
// - SPREAD có thể gây overhead bộ nhớ khi copy/concat mảng/object rất lớn.
// - Không dùng spread trực tiếp lên non-iterable (ví dụ: {...nonIterable} không hợp lệ nếu nonIterable không phải object), và ...nonArray trong call nếu nonArray không phải iterable.

// Ví dụ: shallow copy ảnh hưởng tới nested references
const nested = [[1], [2]];
const shallow = [...nested];
shallow[0][0] = 999; // ảnh hưởng tới nested vì copy là nông
console.log('nested sau khi thay đổi shallow =', nested);

// =====================================================
// 5) TÍNH TƯƠNG THÍCH (BROWSER / NODE)
// =====================================================
// - Rest parameters: được hỗ trợ từ ES2015 (ES6) => modern browsers + Node 6+ (thực tế dùng Node >=8+ an toàn)
// - Spread cho iterable trong calls/arrays: ES2015
// - Object spread { ...obj }: được chính thức thêm vào ES2018, vì vậy cần môi trường hiện đại (Node >=8.6+ với flag, Node >=8.9+/10+ thực tế), hiện tại các runtime phổ biến đều hỗ trợ.
// - Nếu cần tương thích cũ, dùng Babel hoặc transpiler để chuyển đổi.

// =====================================================
// 6) TÓM TẮT NGẮN
// =====================================================
// - REST (...args): chỉ xuất hiện ở thông số/định danh destructuring; thu thập thành mảng/object.
// - SPREAD (...iterable / ...object): dùng trong biểu thức để mở rộng; tạo bản sao nông khi dùng cho array/object.
// - Quy tắc: REST ở parameter cuối; SPREAD trong expressions.
// - Lưu ý performance và shallow copy khi dùng để clone dữ liệu lồng nhau.

// END
console.log('\n[File RestAndSpreadTheory.js thực thi xong]');

