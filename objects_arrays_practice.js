// Objects và Arrays Practice - Ví dụ thực hành JavaScript
// Chạy file này bằng: node objects_arrays_practice.js

console.log('=== OBJECTS & ARRAYS PRACTICE ===\n');

// ==================== 1. CÁCH TẠO OBJECTS ====================
console.log('1. CÁCH TẠO OBJECTS:');

// Object Literal
const person1 = {
  name: 'Nguyễn Văn An',
  age: 25,
  greet() {
    return `Xin chào, tôi là ${this.name}`;
  }
};
console.log('Object Literal:', person1.greet());

// Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return `Xin chào, tôi là ${this.name}`;
  };
}
const person2 = new Person('Trần Thị Bình', 30);
console.log('Constructor:', person2.greet());

// ES6 Class
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Xin chào, tôi là ${this.name}`;
  }
}
const person3 = new PersonClass('Lê Văn Cường', 28);
console.log('ES6 Class:', person3.greet());

// Object.create()
const personPrototype = {
  greet() {
    return `Xin chào, tôi là ${this.name}`;
  }
};
const person4 = Object.create(personPrototype);
person4.name = 'Phạm Thị Dung';
person4.age = 22;
console.log('Object.create:', person4.greet());

// Factory Function
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      return `Xin chào, tôi là ${this.name}`;
    }
  };
}
const person5 = createPerson('Hoàng Văn Hùng', 26);
console.log('Factory Function:', person5.greet());

console.log('\n');

// ==================== 2. CÁCH TẠO ARRAYS ====================
console.log('2. CÁCH TẠO ARRAYS:');

// Array Literal
const fruits = ['táo', 'cam', 'xoài', 'chuối'];
console.log('Array Literal:', fruits);

// Array Constructor
const numbers1 = new Array(1, 2, 3, 4, 5);
const empty = new Array(3); // 3 empty slots
console.log('Array Constructor:', numbers1);
console.log('Empty Array:', empty, 'length:', empty.length);

// Array.from()
const chars = Array.from('hello');
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log('Array.from string:', chars);
console.log('Array.from range:', range);

// Array.of()
const nums = Array.of(1, 2, 3, 4, 5);
const single = Array.of(7); // [7] khác với new Array(7)
console.log('Array.of:', nums);
console.log('Array.of single:', single);

// Spread với iterable
const set = new Set([1, 2, 3, 2, 1]);
const fromSet = [...set];
console.log('From Set:', fromSet);

console.log('\n');

// ==================== 3. SHALLOW VS DEEP COPY ====================
console.log('3. SHALLOW VS DEEP COPY:');

const original = {
  name: 'An',
  hobbies: ['đọc sách', 'thể thao'],
  address: {
    city: 'Hà Nội',
    district: 'Cầu Giấy'
  }
};

console.log('Original:', JSON.stringify(original, null, 2));

// Shallow copy với spread
const shallowCopy = { ...original };
shallowCopy.name = 'Bình'; // OK - không ảnh hưởng original
shallowCopy.hobbies.push('du lịch'); // Ảnh hưởng original!
shallowCopy.address.city = 'TP.HCM'; // Ảnh hưởng original!

console.log('\nSau khi modify shallow copy:');
console.log('Original after shallow modify:', JSON.stringify(original, null, 2));
console.log('Shallow copy:', JSON.stringify(shallowCopy, null, 2));

// Reset original
original.hobbies = ['đọc sách', 'thể thao'];
original.address.city = 'Hà Nội';

// Deep copy với JSON
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.name = 'Cường';
deepCopy.hobbies.push('âm nhạc');
deepCopy.address.city = 'Đà Nẵng';

console.log('\nSau khi modify deep copy:');
console.log('Original after deep modify:', JSON.stringify(original, null, 2));
console.log('Deep copy:', JSON.stringify(deepCopy, null, 2));

console.log('\n');

// ==================== 4. OBJECT.ASSIGN() ====================
console.log('4. OBJECT.ASSIGN():');

const defaults = { color: 'blue', size: 'M', material: 'cotton' };
const userPrefs = { color: 'red', size: 'L' };
const extra = { brand: 'Nike' };

const merged = Object.assign({}, defaults, userPrefs, extra);
console.log('Defaults:', defaults);
console.log('User Preferences:', userPrefs);
console.log('Merged:', merged);

// Shallow copy demonstration
const objWithNested = { a: 1, b: { c: 2 } };
const assignCopy = Object.assign({}, objWithNested);

assignCopy.a = 99; // OK
assignCopy.b.c = 99; // Ảnh hưởng original!

console.log('\nObject.assign shallow copy:');
console.log('Original:', objWithNested);
console.log('Assign copy:', assignCopy);

console.log('\n');

// ==================== 5. SPREAD OPERATOR ====================
console.log('5. SPREAD OPERATOR:');

// Clone array
const originalArray = [1, 2, [3, 4]];
const clonedArray = [...originalArray];

clonedArray[0] = 99; // OK
clonedArray[2][0] = 99; // Ảnh hưởng original!

console.log('Original array:', originalArray);
console.log('Cloned array:', clonedArray);

// Merge arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const mergedArray = [...arr1, ...arr2, ...arr3];
console.log('Merged arrays:', mergedArray);

// Clone object
const originalObj = {
  name: 'Test',
  nested: { value: 42 }
};
const clonedObj = { ...originalObj };

clonedObj.name = 'Modified'; // OK
clonedObj.nested.value = 99; // Ảnh hưởng original!

console.log('Original object:', originalObj);
console.log('Cloned object:', clonedObj);

console.log('\n');

// ==================== 6. JSON CLONE HẠN CHẾ ====================
console.log('6. JSON CLONE HẠN CHẾ:');

const problematic = {
  // Functions bị loại bỏ
  method: function() { return 'hello'; },

  // undefined bị loại bỏ
  undef: undefined,

  // Date thành string
  date: new Date('2023-01-01'),

  // RegExp thành object rỗng
  regex: /abc/g,

  // Infinity và NaN thành null
  infinity: Infinity,
  notNumber: NaN,

  // Map, Set thành object rỗng
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),

  // Normal data - OK
  name: 'Test',
  array: [1, 2, 3]
};

console.log('Original problematic object:');
console.log('- method:', typeof problematic.method);
console.log('- undef:', problematic.undef);
console.log('- date:', problematic.date);
console.log('- regex:', problematic.regex);
console.log('- infinity:', problematic.infinity);
console.log('- notNumber:', problematic.notNumber);
console.log('- map:', problematic.map);
console.log('- set:', problematic.set);

const jsonCloned = JSON.parse(JSON.stringify(problematic));
console.log('\nAfter JSON clone:', jsonCloned);

console.log('\n');

// ==================== 7. OBJECT.FREEZE() VS OBJECT.SEAL() ====================
console.log('7. OBJECT.FREEZE() VS OBJECT.SEAL():');

// Object.freeze()
const frozen = { name: 'An', age: 25 };
Object.freeze(frozen);

console.log('Before freeze operations:');
console.log('Frozen object:', frozen);

// Thử modify
frozen.name = 'Bình'; // Không có tác dụng
frozen.newProp = 'test'; // Không có tác dụng
delete frozen.age; // Không có tác dụng

console.log('After freeze operations:');
console.log('Frozen object:', frozen);
console.log('Is frozen:', Object.isFrozen(frozen));

// Object.seal()
const sealed = { name: 'Cường', age: 30 };
Object.seal(sealed);

console.log('\nBefore seal operations:');
console.log('Sealed object:', sealed);

// Thử modify
sealed.name = 'Dung'; // OK - có thể sửa
sealed.newProp = 'test'; // Không có tác dụng - không thể thêm
delete sealed.age; // Không có tác dụng - không thể xóa

console.log('After seal operations:');
console.log('Sealed object:', sealed);
console.log('Is sealed:', Object.isSealed(sealed));

// Shallow freeze/seal
const nestedObj = {
  prop: 'value',
  nested: { inner: 'can still change' }
};

Object.freeze(nestedObj);
nestedObj.nested.inner = 'changed!'; // Vẫn thay đổi được!

console.log('\nShallow freeze demonstration:');
console.log('Nested object after freeze:', nestedObj);

console.log('\n');

// ==================== 8. OBJECT DESTRUCTURING ====================
console.log('8. OBJECT DESTRUCTURING:');

const user = {
  id: 1,
  name: 'Nguyễn Văn An',
  email: 'an@example.com',
  address: {
    street: '123 Đường ABC',
    city: 'Hà Nội',
    country: 'Việt Nam'
  },
  preferences: {
    theme: 'dark',
    language: 'vi'
  }
};

// Basic destructuring
const { name, email } = user;
console.log('Basic:', name, email);

// Rename variables
const { name: userName, email: userEmail } = user;
console.log('Renamed:', userName, userEmail);

// Default values
const { name: n, age = 25, country = 'Unknown' } = user;
console.log('With defaults:', n, age, country);

// Nested destructuring
const { address: { city, country: userCountry } } = user;
console.log('Nested:', city, userCountry);

// Rest pattern
const { id, ...userInfo } = user;
console.log('Rest pattern:', id);
console.log('User info:', Object.keys(userInfo));

// Function parameter destructuring
function greetUser({ name, age = 18 }) {
  return `Xin chào ${name}, bạn ${age} tuổi`;
}

console.log('Function destructuring:', greetUser({ name: 'Bình', age: 25 }));
console.log('Function destructuring with default:', greetUser({ name: 'Cường' }));

console.log('\n');

// ==================== 9. ARRAY DESTRUCTURING ====================
console.log('9. ARRAY DESTRUCTURING:');

const colors = ['đỏ', 'xanh', 'vàng', 'tím', 'cam'];

// Basic destructuring
const [first, second] = colors;
console.log('Basic:', first, second);

// Skip elements
const [firstColor, , thirdColor] = colors;
console.log('Skip elements:', firstColor, thirdColor);

// Default values
const [a, b, c, d, e, f = 'hồng'] = colors;
console.log('With default:', f);

// Rest pattern
const [primary, ...otherColors] = colors;
console.log('Rest pattern:', primary, otherColors);

// Nested array destructuring
const matrix = [[1, 2], [3, 4], [5, 6]];
const [[x1, y1], [x2, y2]] = matrix;
console.log('Nested arrays:', x1, y1, x2, y2);

// Swapping variables
let x = 1, y = 2;
console.log('Before swap:', x, y);
[x, y] = [y, x];
console.log('After swap:', x, y);

// Function return destructuring
function getCoordinates() {
  return [10, 20, 30];
}

const [posX, posY, posZ = 0] = getCoordinates();
console.log('Function return:', posX, posY, posZ);

console.log('\n');

// ==================== 10. BÀI TẬP THỰC HÀNH ====================
console.log('10. BÀI TẬP THỰC HÀNH:');

// Bài tập 1: Clone comparison
console.log('Bài tập 1 - Clone comparison:');

const complexObj = {
  name: 'Test Object',
  data: [1, 2, { nested: 'value' }],
  config: {
    theme: 'dark',
    settings: {
      auto: true
    }
  }
};

const spread = { ...complexObj };
const assign = Object.assign({}, complexObj);
const json = JSON.parse(JSON.stringify(complexObj));

// Modify nested values
spread.data[2].nested = 'spread modified';
console.log('Original after spread modify:', complexObj.data[2].nested);

assign.config.settings.auto = false;
console.log('Original after assign modify:', complexObj.config.settings.auto);

json.config.theme = 'light';
console.log('Original after json modify:', complexObj.config.theme);

// Bài tập 2: Advanced destructuring
console.log('\nBài tập 2 - Advanced destructuring:');

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

// Destructure status và total
const { status, data: { meta: { total } } } = apiResponse;
console.log('Status và Total:', status, total);

// Destructure first user info
const { data: { users: [{ profile: { name: firstName, email: firstEmail } }] } } = apiResponse;
console.log('First user:', firstName, firstEmail);

// Extract all themes
const themes = apiResponse.data.users.map(({ settings: { theme } }) => theme);
console.log('All themes:', themes);

// Bài tập 3: Utility functions
console.log('\nBài tập 3 - Utility functions:');

// Shallow equal function
function isShallowEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

// Deep equal function (simplified)
function isDeepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (obj1 == null || obj2 == null) return false;

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isDeepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

// Test utility functions
const test1 = { a: 1, b: 2 };
const test2 = { a: 1, b: 2 };
const test3 = { a: 1, b: { c: 3 } };
const test4 = { a: 1, b: { c: 3 } };

console.log('Shallow equal test1 vs test2:', isShallowEqual(test1, test2));
console.log('Shallow equal test3 vs test4:', isShallowEqual(test3, test4));
console.log('Deep equal test3 vs test4:', isDeepEqual(test3, test4));

console.log('\n=== KẾT THÚC PRACTICE ===');
