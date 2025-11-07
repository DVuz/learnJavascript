# Thao tác Thêm, Sửa, Xóa Mảng và Object trong JavaScript (Tiếng Việt)

Tài liệu này giải thích chi tiết các cách thao tác với Mảng (Array) và Object trong JavaScript: thêm, sửa, xóa phần tử/thuộc tính.

## Mục lục
- [Thao tác với Mảng (Array)](#thao-tác-với-mảng-array)
  - [1. Thêm phần tử vào Mảng](#1-thêm-phần-tử-vào-mảng)
  - [2. Sửa phần tử trong Mảng](#2-sửa-phần-tử-trong-mảng)
  - [3. Xóa phần tử khỏi Mảng](#3-xóa-phần-tử-khỏi-mảng)
- [Thao tác với Object](#thao-tác-với-object)
  - [1. Thêm thuộc tính vào Object](#1-thêm-thuộc-tính-vào-object)
  - [2. Sửa thuộc tính trong Object](#2-sửa-thuộc-tính-trong-object)
  - [3. Xóa thuộc tính khỏi Object](#3-xóa-thuộc-tính-khỏi-object)
- [So sánh Mutating vs Non-mutating](#so-sánh-mutating-vs-non-mutating)
- [Tổng kết & Best Practices](#tổng-kết--best-practices)

---

## Thao tác với Mảng (Array)

### 1. Thêm phần tử vào Mảng

#### a) Thêm vào cuối mảng

**`push()` - Mutating**
- Thêm một hoặc nhiều phần tử vào cuối mảng
- Thay đổi mảng gốc
- Trả về độ dài mới của mảng

```javascript
const arr = [1, 2, 3];
arr.push(4);        // arr = [1, 2, 3, 4], trả về 4
arr.push(5, 6);     // arr = [1, 2, 3, 4, 5, 6], trả về 6
```

**Spread operator `[...]` - Non-mutating**
- Tạo mảng mới với phần tử thêm vào
- Không thay đổi mảng gốc

```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4];  // newArr = [1, 2, 3, 4], arr không đổi
```

**`concat()` - Non-mutating**
- Nối mảng hoặc giá trị vào cuối
- Trả về mảng mới

```javascript
const arr = [1, 2, 3];
const newArr = arr.concat(4, 5);  // newArr = [1, 2, 3, 4, 5]
```

#### b) Thêm vào đầu mảng

**`unshift()` - Mutating**
- Thêm một hoặc nhiều phần tử vào đầu mảng
- Thay đổi mảng gốc
- Trả về độ dài mới

```javascript
const arr = [2, 3, 4];
arr.unshift(1);     // arr = [1, 2, 3, 4], trả về 4
arr.unshift(-1, 0); // arr = [-1, 0, 1, 2, 3, 4], trả về 6
```

**Spread operator - Non-mutating**

```javascript
const arr = [2, 3, 4];
const newArr = [1, ...arr];  // newArr = [1, 2, 3, 4]
```

#### c) Thêm vào vị trí bất kỳ

**`splice()` - Mutating**
- Cú pháp: `array.splice(index, deleteCount, item1, item2, ...)`
- Xóa `deleteCount` phần tử từ vị trí `index`, sau đó thêm các item mới

```javascript
const arr = [1, 2, 5, 6];
arr.splice(2, 0, 3, 4);  // Thêm 3, 4 vào vị trí index 2
// arr = [1, 2, 3, 4, 5, 6]
```

**Spread với slice - Non-mutating**

```javascript
const arr = [1, 2, 5, 6];
const newArr = [...arr.slice(0, 2), 3, 4, ...arr.slice(2)];
// newArr = [1, 2, 3, 4, 5, 6]
```

---

### 2. Sửa phần tử trong Mảng

#### a) Sửa trực tiếp qua index - Mutating

```javascript
const arr = [1, 2, 3, 4];
arr[1] = 20;  // arr = [1, 20, 3, 4]
```

#### b) Sửa bằng `splice()` - Mutating

```javascript
const arr = [1, 2, 3, 4];
arr.splice(1, 1, 20);  // Xóa 1 phần tử tại index 1, thêm 20
// arr = [1, 20, 3, 4]
```

#### c) Sửa bằng `map()` - Non-mutating

```javascript
const arr = [1, 2, 3, 4];
const newArr = arr.map((item, index) => index === 1 ? 20 : item);
// newArr = [1, 20, 3, 4], arr không đổi
```

#### d) Sửa nhiều phần tử với điều kiện

```javascript
const arr = [1, 2, 3, 4, 5];
// Nhân đôi các số chẵn
const newArr = arr.map(x => x % 2 === 0 ? x * 2 : x);
// newArr = [1, 4, 3, 8, 5]
```

---

### 3. Xóa phần tử khỏi Mảng

#### a) Xóa phần tử cuối

**`pop()` - Mutating**
- Xóa và trả về phần tử cuối cùng
- Thay đổi mảng gốc

```javascript
const arr = [1, 2, 3, 4];
const last = arr.pop();  // last = 4, arr = [1, 2, 3]
```

**`slice()` - Non-mutating**

```javascript
const arr = [1, 2, 3, 4];
const newArr = arr.slice(0, -1);  // newArr = [1, 2, 3]
```

#### b) Xóa phần tử đầu

**`shift()` - Mutating**
- Xóa và trả về phần tử đầu tiên
- Thay đổi mảng gốc

```javascript
const arr = [1, 2, 3, 4];
const first = arr.shift();  // first = 1, arr = [2, 3, 4]
```

**`slice()` - Non-mutating**

```javascript
const arr = [1, 2, 3, 4];
const newArr = arr.slice(1);  // newArr = [2, 3, 4]
```

#### c) Xóa tại vị trí cụ thể

**`splice()` - Mutating**

```javascript
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);  // Xóa 1 phần tử tại index 2
// arr = [1, 2, 4, 5]

arr.splice(1, 2);  // Xóa 2 phần tử từ index 1
// arr = [1, 5]
```

**`filter()` - Non-mutating**

```javascript
const arr = [1, 2, 3, 4, 5];
// Xóa phần tử tại index 2
const newArr = arr.filter((item, index) => index !== 2);
// newArr = [1, 2, 4, 5]
```

#### d) Xóa theo điều kiện

**`filter()` - Non-mutating**

```javascript
const arr = [1, 2, 3, 4, 5, 6];
// Xóa các số chẵn
const newArr = arr.filter(x => x % 2 !== 0);
// newArr = [1, 3, 5]
```

#### e) Xóa với `delete` - Không khuyến khích

```javascript
const arr = [1, 2, 3, 4];
delete arr[1];  // arr = [1, <1 empty item>, 3, 4]
// Tạo "lỗ hổng" trong mảng, length không đổi
```

**Lưu ý:** `delete` chỉ xóa giá trị, không xóa index, tạo ra empty slot. Nên dùng `splice()` hoặc `filter()`.

#### f) Xóa tất cả phần tử

```javascript
// Cách 1: Gán length = 0
const arr = [1, 2, 3];
arr.length = 0;  // arr = []

// Cách 2: Gán lại mảng mới
let arr2 = [1, 2, 3];
arr2 = [];  // arr2 = []

// Cách 3: splice
const arr3 = [1, 2, 3];
arr3.splice(0, arr3.length);  // arr3 = []
```

---

## Thao tác với Object

### 1. Thêm thuộc tính vào Object

#### a) Dot notation

```javascript
const obj = { name: 'An' };
obj.age = 25;  // obj = { name: 'An', age: 25 }
```

#### b) Bracket notation

```javascript
const obj = { name: 'An' };
obj['city'] = 'Hanoi';  // obj = { name: 'An', city: 'Hanoi' }

// Hữu ích với tên thuộc tính động
const key = 'job';
obj[key] = 'Developer';  // obj = { name: 'An', city: 'Hanoi', job: 'Developer' }
```

#### c) Object spread - Non-mutating

```javascript
const obj = { name: 'An' };
const newObj = { ...obj, age: 25 };
// newObj = { name: 'An', age: 25 }, obj không đổi
```

#### d) Object.assign() - Mutating hoặc Non-mutating

```javascript
// Mutating - thay đổi object đầu tiên
const obj = { name: 'An' };
Object.assign(obj, { age: 25, city: 'Hanoi' });
// obj = { name: 'An', age: 25, city: 'Hanoi' }

// Non-mutating - tạo object mới
const obj2 = { name: 'Binh' };
const newObj = Object.assign({}, obj2, { age: 30 });
// newObj = { name: 'Binh', age: 30 }, obj2 không đổi
```

#### e) Định nghĩa nhiều thuộc tính với Object.defineProperties()

```javascript
const obj = {};
Object.defineProperties(obj, {
  name: { value: 'An', writable: true, enumerable: true },
  age: { value: 25, writable: true, enumerable: true }
});
// obj = { name: 'An', age: 25 }
```

---

### 2. Sửa thuộc tính trong Object

#### a) Gán trực tiếp - Mutating

```javascript
const obj = { name: 'An', age: 25 };
obj.age = 26;  // obj = { name: 'An', age: 26 }
obj['name'] = 'Binh';  // obj = { name: 'Binh', age: 26 }
```

#### b) Object spread - Non-mutating

```javascript
const obj = { name: 'An', age: 25 };
const newObj = { ...obj, age: 26 };
// newObj = { name: 'An', age: 26 }, obj không đổi
```

#### c) Object.assign() - Mutating hoặc Non-mutating

```javascript
// Mutating
const obj = { name: 'An', age: 25 };
Object.assign(obj, { age: 26 });
// obj = { name: 'An', age: 26 }

// Non-mutating
const obj2 = { name: 'Binh', age: 30 };
const newObj = Object.assign({}, obj2, { age: 31 });
// newObj = { name: 'Binh', age: 31 }
```

#### d) Sửa thuộc tính nested

```javascript
const obj = { 
  user: { name: 'An', age: 25 },
  city: 'Hanoi'
};

// Mutating - cẩn thận với reference
obj.user.age = 26;

// Non-mutating - tạo object mới hoàn toàn
const newObj = {
  ...obj,
  user: { ...obj.user, age: 26 }
};
// newObj.user.age = 26, obj.user.age = 25
```

---

### 3. Xóa thuộc tính khỏi Object

#### a) `delete` operator - Mutating

```javascript
const obj = { name: 'An', age: 25, city: 'Hanoi' };
delete obj.age;  // obj = { name: 'An', city: 'Hanoi' }

// Kiểm tra kết quả
console.log('age' in obj);  // false
console.log(obj.age);       // undefined
```

#### b) Destructuring với rest - Non-mutating

```javascript
const obj = { name: 'An', age: 25, city: 'Hanoi' };
const { age, ...newObj } = obj;
// newObj = { name: 'An', city: 'Hanoi' }
// obj vẫn nguyên
```

#### c) Xóa nhiều thuộc tính

```javascript
// Mutating
const obj = { a: 1, b: 2, c: 3, d: 4 };
delete obj.b;
delete obj.d;
// obj = { a: 1, c: 3 }

// Non-mutating với destructuring
const obj2 = { a: 1, b: 2, c: 3, d: 4 };
const { b, d, ...newObj } = obj2;
// newObj = { a: 1, c: 3 }
```

#### d) Xóa thuộc tính với điều kiện

```javascript
const obj = { a: 1, b: null, c: 3, d: undefined, e: 5 };

// Xóa thuộc tính có giá trị null hoặc undefined
const newObj = Object.fromEntries(
  Object.entries(obj).filter(([key, value]) => value != null)
);
// newObj = { a: 1, c: 3, e: 5 }
```

#### e) Gán undefined vs delete

```javascript
const obj = { a: 1, b: 2 };

obj.b = undefined;  // { a: 1, b: undefined }
console.log('b' in obj);  // true - thuộc tính vẫn tồn tại

delete obj.b;  // { a: 1 }
console.log('b' in obj);  // false - thuộc tính đã bị xóa
```

---

## So sánh Mutating vs Non-mutating

### Mutating Methods (Thay đổi dữ liệu gốc)

**Mảng:**
- `push()`, `pop()`, `shift()`, `unshift()`
- `splice()`
- `sort()`, `reverse()`
- `fill()`
- Gán trực tiếp: `arr[index] = value`

**Object:**
- Gán trực tiếp: `obj.prop = value`
- `delete obj.prop`
- `Object.assign(obj, ...)`

**Ưu điểm:**
- Hiệu năng tốt hơn (không tạo bản sao)
- Tiết kiệm bộ nhớ

**Nhược điểm:**
- Khó debug
- Có thể gây lỗi nếu nhiều nơi tham chiếu cùng object/array
- Không phù hợp với React/Redux (cần immutability)

### Non-mutating Methods (Không thay đổi dữ liệu gốc)

**Mảng:**
- `map()`, `filter()`, `reduce()`
- `slice()`, `concat()`
- Spread: `[...arr]`
- `Array.from()`

**Object:**
- Spread: `{...obj}`
- `Object.assign({}, obj, ...)`
- Destructuring với rest

**Ưu điểm:**
- An toàn hơn, dễ debug
- Phù hợp với functional programming
- Bắt buộc trong React, Redux

**Nhược điểm:**
- Tốn bộ nhớ hơn (tạo bản sao)
- Có thể chậm hơn với dữ liệu lớn

---

## Tổng kết & Best Practices

### Khi nào dùng Mutating?

- Khi performance quan trọng với mảng/object lớn
- Khi chắc chắn không có tham chiếu khác đến object
- Trong các thuật toán yêu cầu thay đổi tại chỗ

### Khi nào dùng Non-mutating?

- Khi làm việc với React, Vue, Redux (cần immutability)
- Khi muốn giữ lịch sử thay đổi (undo/redo)
- Khi nhiều nơi tham chiếu cùng dữ liệu
- Khi code cần dễ đọc, dễ debug

### Mẹo nhanh

**Mảng:**
```javascript
// Thêm cuối:     push() hoặc [...arr, item]
// Thêm đầu:      unshift() hoặc [item, ...arr]
// Xóa cuối:      pop() hoặc slice(0, -1)
// Xóa đầu:       shift() hoặc slice(1)
// Xóa giữa:      splice() hoặc filter()
// Sửa:           arr[i] = value hoặc map()
```

**Object:**
```javascript
// Thêm:          obj.key = value hoặc {...obj, key: value}
// Sửa:           obj.key = newValue hoặc {...obj, key: newValue}
// Xóa:           delete obj.key hoặc {key, ...rest} = obj
```

### Performance Tips

- Với mảng lớn (>10,000 phần tử), mutating methods nhanh hơn đáng kể
- Spread operator tạo shallow copy - cẩn thận với nested structures
- Để deep copy: dùng `structuredClone()` (modern) hoặc `JSON.parse(JSON.stringify())` (có hạn chế)

### Lưu ý quan trọng

1. **Shallow vs Deep Copy**: Spread và Object.assign chỉ copy mức đầu tiên
2. **Reference Types**: Object và Array được truyền bởi tham chiếu
3. **Const không ngăn mutation**: `const arr = []` vẫn cho phép `arr.push()`
4. **Delete operator**: Với object literal thì OK, nhưng cẩn thận với properties non-configurable

---

Tài liệu này cung cấp đầy đủ các phương pháp thao tác mảng và object. Tham khảo file `arrays_objects_crud_examples.js` để xem các ví dụ chạy được.

