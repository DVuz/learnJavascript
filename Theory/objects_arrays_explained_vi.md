# Object và Array trong JavaScript — Giải thích chi tiết (Tiếng Việt)

Tài liệu này trình bày chi tiết các khái niệm về Object và Array trong JavaScript: cách tạo object/array, shallow copy vs deep copy, Object.assign(), spread operator, JSON clone, Object.freeze() vs Object.seal(), destructuring và các ví dụ thực hành.

## Mục lục
1. [Cách tạo Object trong JS](#1-cách-tạo-object-trong-js)
2. [Cách tạo Array trong JS](#2-cách-tạo-array-trong-js)
3. [Shallow Copy vs Deep Copy](#3-shallow-copy-vs-deep-copy)
4. [Object.assign() để làm gì?](#4-objectassign-để-làm-gì)
5. [Spread operator (...) để clone object/array](#5-spread-operator--để-clone-objectarray)
6. [Hạn chế của JSON.parse(JSON.stringify(obj))](#6-hạn-chế-của-jsonparsejsonstringifyobj)
7. [Object.freeze() vs Object.seal()](#7-objectfreeze-vs-objectseal)
8. [Object Destructuring](#8-object-destructuring)
9. [Array Destructuring](#9-array-destructuring)
10. [Phần thực hành](#10-phần-thực-hành)

---

## 1) Cách tạo Object trong JS

### Object Literal (phổ biến nhất)
```javascript
const person = {
  name: 'An',
  age: 25,
  greet() {
    return `Xin chào, tôi là ${this.name}`;
  }
};
```

### Constructor Function
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return `Xin chào, tôi là ${this.name}`;
  };
}
const person1 = new Person('Bình', 30);
```

### ES6 Class
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Xin chào, tôi là ${this.name}`;
  }
}
const person2 = new Person('Cường', 28);
```

### Object.create()
```javascript
const personPrototype = {
  greet() {
    return `Xin chào, tôi là ${this.name}`;
  }
};

const person3 = Object.create(personPrototype);
person3.name = 'Dung';
person3.age = 22;
```

### Factory Function
```javascript
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      return `Xin chào, tôi là ${this.name}`;
    }
  };
}
const person4 = createPerson('Hoa', 26);
```

---

## 2) Cách tạo Array trong JS

### Array Literal (phổ biến nhất)
```javascript
const fruits = ['táo', 'cam', 'xoài'];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, null, { name: 'An' }];
```

### Array Constructor
```javascript
const arr1 = new Array(5); // tạo array với 5 phần tử empty
const arr2 = new Array(1, 2, 3); // tạo array [1, 2, 3]
const arr3 = Array(3); // giống new Array(3)
```

### Array.from()
```javascript
// Từ string
const chars = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

// Từ NodeList
const divs = Array.from(document.querySelectorAll('div'));

// Tạo array với length và mapper
const range = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
```

### Array.of()
```javascript
const arr = Array.of(1, 2, 3); // [1, 2, 3]
const single = Array.of(5); // [5] (khác với new Array(5))
```

### Spread với iterable
```javascript
const str = 'hello';
const chars = [...str]; // ['h', 'e', 'l', 'l', 'o']

const set = new Set([1, 2, 3]);
const arr = [...set]; // [1, 2, 3]
```

---

## 3) Shallow Copy vs Deep Copy

### Shallow Copy (Sao chép nông)
- Chỉ copy level đầu tiên của object/array
- Các nested object/array vẫn reference tới object gốc
- Thay đổi nested object sẽ ảnh hưởng cả bản gốc và bản copy

```javascript
const original = {
  name: 'An',
  hobbies: ['đọc sách', 'thể thao'],
  address: {
    city: 'Hà Nội',
    district: 'Cầu Giấy'
  }
};

// Shallow copy
const shallowCopy = { ...original };
shallowCopy.name = 'Bình'; // OK - không ảnh hưởng original
shallowCopy.hobbies.push('du lịch'); // Ảnh hưởng cả original!
shallowCopy.address.city = 'TP.HCM'; // Ảnh hưởng cả original!

console.log(original.hobbies); // ['đọc sách', 'thể thao', 'du lịch']
console.log(original.address.city); // 'TP.HCM'
```

### Deep Copy (Sao chép sâu)
- Copy toàn bộ structure, kể cả nested objects
- Tạo ra object hoàn toàn độc lập
- Thay đổi ở bất kỳ level nào đều không ảnh hưởng object gốc

```javascript
// Deep copy với JSON (có hạn chế)
const deepCopy1 = JSON.parse(JSON.stringify(original));

// Deep copy với structuredClone (modern)
const deepCopy2 = structuredClone(original);

// Deep copy với thư viện như Lodash
const _ = require('lodash');
const deepCopy3 = _.cloneDeep(original);
```

---

## 4) Object.assign() để làm gì?

### Công dụng chính
- Copy enumerable own properties từ source objects sang target object
- Merge nhiều objects
- Tạo shallow copy của object

### Cú pháp
```javascript
Object.assign(target, ...sources)
```

### Ví dụ merge objects
```javascript
const defaults = { color: 'blue', size: 'M' };
const userPrefs = { color: 'red', material: 'cotton' };

const result = Object.assign({}, defaults, userPrefs);
// { color: 'red', size: 'M', material: 'cotton' }
// userPrefs.color ghi đè defaults.color
```

### Ví dụ shallow copy
```javascript
const original = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, original);

copy.a = 99; // OK - không ảnh hưởng original
copy.b.c = 99; // Ảnh hưởng original vì shallow copy!
```

### Lưu ý quan trọng
- Chỉ copy enumerable own properties (không copy prototype chain)
- Chỉ copy property descriptors có writable: true
- Không copy getters/setters (chỉ copy value)
- Shallow copy - nested objects vẫn reference

---

## 5) Spread operator (...) để clone object/array

### Clone Array
```javascript
const original = [1, 2, 3, [4, 5]];
const clone = [...original];

clone[0] = 99; // OK - không ảnh hưởng original
clone[3][0] = 99; // Ảnh hưởng original vì shallow copy!

// Merge arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]
```

### Clone Object
```javascript
const original = { 
  name: 'An', 
  skills: ['JS', 'React'],
  details: { age: 25 }
};

const clone = { ...original };
clone.name = 'Bình'; // OK
clone.skills.push('Vue'); // Ảnh hưởng original!
clone.details.age = 30; // Ảnh hưởng original!

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }
```

### So sánh với Object.assign()
```javascript
// Tương đương nhau cho shallow copy
const copy1 = { ...original };
const copy2 = Object.assign({}, original);

// Spread ngắn gọn hơn và dễ đọc hơn
const merged1 = { ...defaults, ...userPrefs };
const merged2 = Object.assign({}, defaults, userPrefs);
```

---

## 6) Hạn chế của JSON.parse(JSON.stringify(obj))

### Những gì bị mất hoặc sai
```javascript
const problematic = {
  // 1. Functions bị loại bỏ
  method: function() { return 'hello'; },
  
  // 2. undefined bị loại bỏ
  undef: undefined,
  
  // 3. Symbol bị loại bỏ
  [Symbol('key')]: 'symbol value',
  
  // 4. Date thành string
  date: new Date(),
  
  // 5. RegExp thành object rỗng
  regex: /abc/g,
  
  // 6. Infinity và NaN thành null
  infinity: Infinity,
  notNumber: NaN,
  
  // 7. Circular reference gây lỗi
  // circular: problematic (sẽ gây TypeError)
  
  // 8. Prototype chain bị mất
  // Nếu object có prototype khác Object.prototype
  
  // 9. Non-enumerable properties bị mất
  
  // 10. Map, Set, WeakMap, WeakSet thành object rỗng
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3])
};

const cloned = JSON.parse(JSON.stringify(problematic));
console.log(cloned);
// {
//   date: "2024-11-03T...", // string thay vì Date object
//   regex: {},              // object rỗng
//   infinity: null,         // null thay vì Infinity
//   notNumber: null,        // null thay vì NaN
//   map: {},               // object rỗng
//   set: {}                // object rỗng
// }
// method, undef, Symbol key đều mất
```

### Khi nào nên dùng JSON clone
- Object chỉ chứa primitive values, plain objects và arrays
- Không có functions, Date, RegExp, undefined, Symbol
- Không có circular references
- Cần deep clone nhanh và đơn giản

### Thay thế tốt hơn
```javascript
// Modern: structuredClone (hỗ trợ Date, RegExp, Map, Set...)
const betterClone = structuredClone(original);

// Thư viện: Lodash cloneDeep
const lodashClone = _.cloneDeep(original);
```

---

## 7) Object.freeze() vs Object.seal()

### Object.freeze()
- **Làm object hoàn toàn immutable**
- Không thể thêm, xóa, hoặc sửa properties
- Không thể thay đổi property descriptors

```javascript
const frozen = { name: 'An', age: 25 };
Object.freeze(frozen);

frozen.name = 'Bình'; // Không có tác dụng (strict mode: TypeError)
frozen.newProp = 'test'; // Không có tác dụng
delete frozen.age; // Không có tác dụng

console.log(frozen); // { name: 'An', age: 25 } - không thay đổi
console.log(Object.isFrozen(frozen)); // true
```

### Object.seal()
- **Ngăn thêm/xóa properties, nhưng cho phép sửa existing properties**
- Có thể thay đổi value của properties hiện có
- Không thể thay đổi property descriptors

```javascript
const sealed = { name: 'An', age: 25 };
Object.seal(sealed);

sealed.name = 'Bình'; // OK - có thể sửa
sealed.newProp = 'test'; // Không có tác dụng - không thể thêm
delete sealed.age; // Không có tác dụng - không thể xóa

console.log(sealed); // { name: 'Bình', age: 25 }
console.log(Object.isSealed(sealed)); // true
```

### So sánh trực quan
| Thao tác | Normal Object | Sealed | Frozen |
|----------|---------------|---------|---------|
| Sửa property | ✅ | ✅ | ❌ |
| Thêm property | ✅ | ❌ | ❌ |
| Xóa property | ✅ | ❌ | ❌ |
| Sửa descriptor | ✅ | ❌ | ❌ |

### Lưu ý quan trọng
```javascript
const obj = {
  nested: { value: 42 }
};

Object.freeze(obj);
obj.nested.value = 99; // Vẫn thay đổi được! (shallow freeze)

// Để deep freeze, cần freeze recursive
function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (obj[prop] !== null && typeof obj[prop] === 'object') {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}
```

---

## 8) Object Destructuring

### Cú pháp cơ bản
```javascript
const person = { name: 'An', age: 25, city: 'Hà Nội' };

// Destructuring
const { name, age } = person;
console.log(name, age); // 'An' 25
```

### Đổi tên biến
```javascript
const { name: userName, age: userAge } = person;
console.log(userName, userAge); // 'An' 25
```

### Default values
```javascript
const { name, age, country = 'Việt Nam' } = person;
console.log(country); // 'Việt Nam' (vì person không có country)
```

### Nested destructuring
```javascript
const user = {
  info: {
    name: 'An',
    contact: {
      email: 'an@example.com'
    }
  }
};

const { info: { name, contact: { email } } } = user;
console.log(name, email); // 'An' 'an@example.com'
```

### Rest pattern trong object
```javascript
const settings = { theme: 'dark', lang: 'vi', debug: true, version: '1.0' };

const { theme, ...otherSettings } = settings;
console.log(theme); // 'dark'
console.log(otherSettings); // { lang: 'vi', debug: true, version: '1.0' }
```

### Destructuring trong function parameters
```javascript
function greet({ name, age = 18 }) {
  return `Xin chào ${name}, bạn ${age} tuổi`;
}

greet({ name: 'Bình', age: 25 }); // 'Xin chào Bình, bạn 25 tuổi'
greet({ name: 'Cường' }); // 'Xin chào Cường, bạn 18 tuổi'
```

---

## 9) Array Destructuring

### Cú pháp cơ bản
```javascript
const colors = ['đỏ', 'xanh', 'vàng', 'tím'];

const [first, second] = colors;
console.log(first, second); // 'đỏ' 'xanh'
```

### Skip elements
```javascript
const [first, , third] = colors; // skip second element
console.log(first, third); // 'đỏ' 'vàng'
```

### Default values
```javascript
const [a, b, c, d, e = 'cam'] = colors;
console.log(e); // 'cam' (vì colors chỉ có 4 phần tử)
```

### Rest pattern trong array
```javascript
const [first, ...rest] = colors;
console.log(first); // 'đỏ'
console.log(rest); // ['xanh', 'vàng', 'tím']
```

### Nested array destructuring
```javascript
const matrix = [[1, 2], [3, 4], [5, 6]];

const [[a, b], [c, d]] = matrix;
console.log(a, b, c, d); // 1 2 3 4
```

### Swapping variables
```javascript
let x = 1, y = 2;
[x, y] = [y, x]; // swap
console.log(x, y); // 2 1
```

### Destructuring function return
```javascript
function getCoordinates() {
  return [10, 20];
}

const [x, y] = getCoordinates();
console.log(x, y); // 10 20
```

### Destructuring trong function parameters
```javascript
function processPoint([x, y, z = 0]) {
  return { x, y, z };
}

processPoint([1, 2]); // { x: 1, y: 2, z: 0 }
```

---

## 10) Phần thực hành

### Bài tập 1: Tạo và clone objects
```javascript
// Tạo một object person với nested properties
const person = {
  name: 'Nguyễn Văn A',
  age: 30,
  address: {
    street: '123 Đường ABC',
    city: 'Hà Nội',
    coordinates: [21.0285, 105.8542]
  },
  hobbies: ['đọc sách', 'du lịch', 'âm nhạc'],
  preferences: {
    theme: 'dark',
    language: 'vi'
  }
};

// TODO: Thực hành các cách clone
// 1. Shallow copy với spread
// 2. Shallow copy với Object.assign
// 3. Deep copy với JSON (lưu ý hạn chế)
// 4. So sánh kết quả khi modify nested properties
```

### Bài tập 2: Array operations và destructuring
```javascript
const students = [
  { name: 'An', scores: [8, 9, 7], info: { class: '12A1', id: 1 } },
  { name: 'Bình', scores: [7, 8, 9], info: { class: '12A2', id: 2 } },
  { name: 'Cường', scores: [9, 8, 8], info: { class: '12A1', id: 3 } }
];

// TODO: Sử dụng destructuring để:
// 1. Lấy tên của student đầu tiên
// 2. Lấy điểm đầu tiên của mỗi student
// 3. Lấy class của student thứ hai
// 4. Tạo array chỉ chứa tên các students
// 5. Tạo object mới với tên và điểm trung bình
```

### Bài tập 3: Object immutability
```javascript
const gameState = {
  player: {
    name: 'Hero',
    level: 1,
    stats: {
      hp: 100,
      mp: 50
    }
  },
  inventory: ['sword', 'potion'],
  settings: {
    sound: true,
    difficulty: 'normal'
  }
};

// TODO: 
// 1. Tạo function updatePlayerLevel() dùng immutable update
// 2. Tạo function addToInventory() không mutate original
// 3. Thử Object.freeze() và Object.seal() trên gameState
// 4. Tạo deep freeze function và test
```

### Bài tập 4: Advanced destructuring
```javascript
const apiResponse = {
  data: {
    users: [
      { 
        id: 1, 
        profile: { name: 'An', email: 'an@example.com' },
        settings: { theme: 'dark', notifications: true }
      },
      { 
        id: 2, 
        profile: { name: 'Bình', email: 'binh@example.com' },
        settings: { theme: 'light', notifications: false }
      }
    ],
    meta: {
      total: 2,
      page: 1,
      hasNext: false
    }
  },
  status: 'success'
};

// TODO: Dùng destructuring để:
// 1. Lấy status và total trong một dòng
// 2. Lấy name và email của user đầu tiên
// 3. Lấy theme của tất cả users
// 4. Tạo function nhận apiResponse và return user info array
```

### Bài tập 5: Comparison functions
```javascript
// TODO: Viết các function so sánh:

// 1. isShallowEqual(obj1, obj2) - so sánh shallow
function isShallowEqual(obj1, obj2) {
  // Your implementation
}

// 2. isDeepEqual(obj1, obj2) - so sánh deep (đơn giản)
function isDeepEqual(obj1, obj2) {
  // Your implementation
}

// 3. mergeDeep(target, source) - merge deep objects
function mergeDeep(target, source) {
  // Your implementation
}

// Test cases
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = { a: 1, b: { c: 3 } };

console.log(isShallowEqual(obj1, obj2)); // ?
console.log(isDeepEqual(obj1, obj2)); // ?
console.log(isDeepEqual(obj1, obj3)); // ?
```

### Đáp án và giải thích
*Các đáp án sẽ được cung cấp trong file `objects_arrays_practice.js` để bạn có thể chạy và kiểm tra.*

---

## Tổng kết nhanh

### Objects
- **Tạo**: literal `{}`, constructor, class, `Object.create()`, factory function
- **Clone**: spread `{...obj}`, `Object.assign()` (shallow), `JSON.parse/stringify` (có hạn chế), `structuredClone()` (modern)
- **Immutability**: `Object.freeze()` (hoàn toàn), `Object.seal()` (chỉ ngăn thêm/xóa)
- **Destructuring**: `{ name, age } = obj`, rename `{ name: userName }`, default `{ country = 'VN' }`

### Arrays  
- **Tạo**: literal `[]`, constructor, `Array.from()`, `Array.of()`, spread `[...iterable]`
- **Clone**: spread `[...arr]`, `Array.from(arr)`, `slice()` (shallow)
- **Destructuring**: `[first, second] = arr`, skip `[first, , third]`, rest `[first, ...rest]`

### Key Points
- **Shallow vs Deep**: shallow chỉ copy level đầu, deep copy toàn bộ nested structure
- **JSON limitations**: mất functions, undefined, Symbol, Date objects, circular refs
- **Immutability**: freeze/seal chỉ ảnh hưởng level đầu, cần deep freeze cho nested
- **Destructuring**: mạnh mẽ cho extract data, có thể combine với default values và renaming

Bạn có muốn tôi tạo thêm file practice với các ví dụ code có thể chạy được không?
