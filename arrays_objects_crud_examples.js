// ========================================
// THAO TÁC THÊM, SỬA, XÓA MẢNG VÀ OBJECT
// ========================================

console.log('=== PHẦN 1: THAO TÁC VỚI MẢNG (ARRAY) ===\n');

// ========================================
// 1. THÊM PHẦN TỬ VÀO MẢNG
// ========================================

console.log('--- 1.1. THÊM VÀO CUỐI MẢNG ---');

// push() - Mutating
let fruits = ['apple', 'banana'];
console.log('Mảng ban đầu:', fruits);
let newLength = fruits.push('orange');
console.log('Sau push("orange"):', fruits);
console.log('Độ dài mới:', newLength);

fruits.push('grape', 'mango');
console.log('Sau push nhiều phần tử:', fruits);

// Spread operator - Non-mutating
const fruits2 = ['apple', 'banana'];
const fruits2New = [...fruits2, 'orange'];
console.log('\nMảng gốc (spread):', fruits2);
console.log('Mảng mới (spread):', fruits2New);

// concat() - Non-mutating
const fruits3 = ['apple', 'banana'];
const fruits3New = fruits3.concat('orange', 'grape');
console.log('\nMảng gốc (concat):', fruits3);
console.log('Mảng mới (concat):', fruits3New);

console.log('\n--- 1.2. THÊM VÀO ĐẦU MẢNG ---');

// unshift() - Mutating
let numbers = [3, 4, 5];
console.log('Mảng ban đầu:', numbers);
numbers.unshift(1, 2);
console.log('Sau unshift(1, 2):', numbers);

// Spread operator - Non-mutating
const numbers2 = [3, 4, 5];
const numbers2New = [1, 2, ...numbers2];
console.log('\nMảng gốc (spread):', numbers2);
console.log('Mảng mới (spread):', numbers2New);

console.log('\n--- 1.3. THÊM VÀO VỊ TRÍ BẤT KỲ ---');

// splice() - Mutating
let letters = ['a', 'b', 'e', 'f'];
console.log('Mảng ban đầu:', letters);
letters.splice(2, 0, 'c', 'd'); // Thêm 'c', 'd' vào vị trí index 2
console.log('Sau splice(2, 0, "c", "d"):', letters);

// Spread với slice - Non-mutating
const letters2 = ['a', 'b', 'e', 'f'];
const letters2New = [...letters2.slice(0, 2), 'c', 'd', ...letters2.slice(2)];
console.log('\nMảng gốc:', letters2);
console.log('Mảng mới:', letters2New);

// ========================================
// 2. SỬA PHẦN TỬ TRONG MẢNG
// ========================================

console.log('\n\n--- 2.1. SỬA TRỰC TIẾP QUA INDEX ---');

let colors = ['red', 'green', 'blue'];
console.log('Mảng ban đầu:', colors);
colors[1] = 'yellow';
console.log('Sau colors[1] = "yellow":', colors);

console.log('\n--- 2.2. SỬA BẰNG splice() ---');

let animals = ['cat', 'dog', 'bird', 'fish'];
console.log('Mảng ban đầu:', animals);
animals.splice(1, 1, 'elephant'); // Xóa 1 phần tử tại index 1, thêm 'elephant'
console.log('Sau splice(1, 1, "elephant"):', animals);

console.log('\n--- 2.3. SỬA BẰNG map() - Non-mutating ---');

const prices = [100, 200, 300, 400];
console.log('Mảng giá ban đầu:', prices);

// Sửa giá tại index 1
const pricesNew = prices.map((price, index) => index === 1 ? 250 : price);
console.log('Mảng gốc:', prices);
console.log('Mảng mới (sửa index 1):', pricesNew);

// Giảm giá 10% cho tất cả
const discountPrices = prices.map(price => price * 0.9);
console.log('Mảng sau giảm 10%:', discountPrices);

console.log('\n--- 2.4. SỬA VỚI ĐIỀU KIỆN ---');

const scores = [45, 78, 92, 63, 88];
console.log('Điểm gốc:', scores);

// Cộng 5 điểm cho những bài < 60
const adjustedScores = scores.map(score => score < 60 ? score + 5 : score);
console.log('Điểm sau điều chỉnh:', adjustedScores);

// ========================================
// 3. XÓA PHẦN TỬ KHỎI MẢNG
// ========================================

console.log('\n\n--- 3.1. XÓA PHẦN TỬ CUỐI ---');

// pop() - Mutating
let stack = [1, 2, 3, 4, 5];
console.log('Mảng ban đầu:', stack);
let removed = stack.pop();
console.log('Phần tử bị xóa:', removed);
console.log('Mảng sau pop():', stack);

// slice() - Non-mutating
const stack2 = [1, 2, 3, 4, 5];
const stack2New = stack2.slice(0, -1);
console.log('\nMảng gốc:', stack2);
console.log('Mảng mới (không có phần tử cuối):', stack2New);

console.log('\n--- 3.2. XÓA PHẦN TỬ ĐẦU ---');

// shift() - Mutating
let queue = [1, 2, 3, 4, 5];
console.log('Mảng ban đầu:', queue);
let first = queue.shift();
console.log('Phần tử đầu bị xóa:', first);
console.log('Mảng sau shift():', queue);

// slice() - Non-mutating
const queue2 = [1, 2, 3, 4, 5];
const queue2New = queue2.slice(1);
console.log('\nMảng gốc:', queue2);
console.log('Mảng mới (không có phần tử đầu):', queue2New);

console.log('\n--- 3.3. XÓA TẠI VỊ TRÍ CỤ THỂ ---');

// splice() - Mutating
let items = ['a', 'b', 'c', 'd', 'e'];
console.log('Mảng ban đầu:', items);
let removedItems = items.splice(2, 1); // Xóa 1 phần tử tại index 2
console.log('Phần tử bị xóa:', removedItems);
console.log('Mảng sau splice(2, 1):', items);

items.splice(1, 2); // Xóa 2 phần tử từ index 1
console.log('Mảng sau splice(1, 2):', items);

// filter() - Non-mutating
const items2 = ['a', 'b', 'c', 'd', 'e'];
const items2New = items2.filter((item, index) => index !== 2);
console.log('\nMảng gốc:', items2);
console.log('Mảng mới (xóa index 2):', items2New);

console.log('\n--- 3.4. XÓA THEO ĐIỀU KIỆN ---');

const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Mảng ban đầu:', allNumbers);

// Xóa các số chẵn
const oddOnly = allNumbers.filter(num => num % 2 !== 0);
console.log('Chỉ giữ số lẻ:', oddOnly);

// Xóa các số > 5
const smallNumbers = allNumbers.filter(num => num <= 5);
console.log('Chỉ giữ số <= 5:', smallNumbers);

console.log('\n--- 3.5. SO SÁNH delete VÀ splice ---');

let testArr = [1, 2, 3, 4, 5];
delete testArr[2];
console.log('Sau delete testArr[2]:', testArr);
console.log('Length:', testArr.length);
console.log('testArr[2]:', testArr[2]);

let testArr2 = [1, 2, 3, 4, 5];
testArr2.splice(2, 1);
console.log('\nSau splice(2, 1):', testArr2);
console.log('Length:', testArr2.length);

console.log('\n--- 3.6. XÓA TẤT CẢ PHẦN TỬ ---');

let arr1 = [1, 2, 3];
arr1.length = 0;
console.log('Cách 1 - arr.length = 0:', arr1);

let arr2 = [1, 2, 3];
arr2 = [];
console.log('Cách 2 - arr = []:', arr2);

let arr3 = [1, 2, 3];
arr3.splice(0, arr3.length);
console.log('Cách 3 - splice(0, length):', arr3);


// ========================================
console.log('\n\n=== PHẦN 2: THAO TÁC VỚI OBJECT ===\n');
// ========================================

// ========================================
// 1. THÊM THUỘC TÍNH VÀO OBJECT
// ========================================

console.log('--- 1.1. DOT NOTATION ---');

let person = { name: 'An', age: 25 };
console.log('Object ban đầu:', person);
person.city = 'Hanoi';
console.log('Sau thêm city:', person);

console.log('\n--- 1.2. BRACKET NOTATION ---');

let user = { name: 'Binh' };
console.log('Object ban đầu:', user);
user['age'] = 30;
console.log('Sau thêm age:', user);

// Tên thuộc tính động
const key = 'job';
user[key] = 'Developer';
console.log('Sau thêm thuộc tính động "job":', user);

console.log('\n--- 1.3. OBJECT SPREAD - Non-mutating ---');

const product = { id: 1, name: 'Laptop' };
const productWithPrice = { ...product, price: 1000 };
console.log('Object gốc:', product);
console.log('Object mới:', productWithPrice);

console.log('\n--- 1.4. Object.assign() ---');

// Mutating
let car = { brand: 'Toyota' };
Object.assign(car, { model: 'Camry', year: 2023 });
console.log('Mutating - Object sau assign:', car);

// Non-mutating
const car2 = { brand: 'Honda' };
const car2New = Object.assign({}, car2, { model: 'Civic', year: 2023 });
console.log('\nObject gốc:', car2);
console.log('Object mới:', car2New);

// ========================================
// 2. SỬA THUỘC TÍNH TRONG OBJECT
// ========================================

console.log('\n\n--- 2.1. GÁN TRỰC TIẾP - Mutating ---');

let student = { name: 'An', grade: 'A', age: 20 };
console.log('Object ban đầu:', student);
student.grade = 'A+';
student['age'] = 21;
console.log('Sau sửa:', student);

console.log('\n--- 2.2. OBJECT SPREAD - Non-mutating ---');

const book = { title: 'JS Guide', price: 50, stock: 10 };
console.log('Object gốc:', book);
const bookUpdated = { ...book, price: 45 };
console.log('Object mới (giá mới):', bookUpdated);

console.log('\n--- 2.3. Object.assign() ---');

const phone = { brand: 'iPhone', price: 999 };
console.log('Object ban đầu:', phone);

// Mutating
Object.assign(phone, { price: 899 });
console.log('Sau assign (mutating):', phone);

// Non-mutating
const phone2 = { brand: 'Samsung', price: 799 };
const phone2New = Object.assign({}, phone2, { price: 699 });
console.log('\nObject gốc:', phone2);
console.log('Object mới:', phone2New);

console.log('\n--- 2.4. SỬA THUỘC TÍNH NESTED ---');

const company = {
    name: 'TechCorp',
    ceo: { name: 'John', age: 45 },
    location: 'Vietnam'
};
console.log('Object ban đầu:', JSON.stringify(company, null, 2));

// Mutating - thay đổi nested object
company.ceo.age = 46;
console.log('\nSau sửa mutating:', JSON.stringify(company, null, 2));

// Non-mutating - tạo object mới hoàn toàn
const company2 = {
    name: 'DevCorp',
    ceo: { name: 'Jane', age: 40 },
    location: 'USA'
};

const company2New = {
    ...company2,
    ceo: { ...company2.ceo, age: 41 }
};
console.log('\nObject gốc:', JSON.stringify(company2, null, 2));
console.log('Object mới:', JSON.stringify(company2New, null, 2));

// ========================================
// 3. XÓA THUỘC TÍNH KHỎI OBJECT
// ========================================

console.log('\n\n--- 3.1. delete OPERATOR - Mutating ---');

let employee = { id: 1, name: 'An', age: 30, city: 'Hanoi' };
console.log('Object ban đầu:', employee);
delete employee.age;
console.log('Sau delete age:', employee);
console.log('Kiểm tra "age" in employee:', 'age' in employee);

console.log('\n--- 3.2. DESTRUCTURING VỚI REST - Non-mutating ---');

const laptop = { id: 1, brand: 'Dell', price: 800, color: 'black' };
console.log('Object gốc:', laptop);

const { price, ...laptopWithoutPrice } = laptop;
console.log('Object mới (không có price):', laptopWithoutPrice);
console.log('Object gốc vẫn nguyên:', laptop);

console.log('\n--- 3.3. XÓA NHIỀU THUỘC TÍNH ---');

const config = { a: 1, b: 2, c: 3, d: 4, e: 5 };
console.log('Object ban đầu:', config);

// Mutating
delete config.b;
delete config.d;
console.log('Sau delete b và d:', config);

// Non-mutating với destructuring
const config2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const { b, d, ...configNew } = config2;
console.log('\nObject gốc:', config2);
console.log('Object mới:', configNew);

console.log('\n--- 3.4. XÓA THUỘC TÍNH VỚI ĐIỀU KIỆN ---');

const userData = {
    name: 'An',
    age: null,
    city: 'Hanoi',
    phone: undefined,
    email: 'an@example.com',
    address: null
};
console.log('Object ban đầu:', userData);

// Xóa thuộc tính có giá trị null hoặc undefined
const cleanedData = Object.fromEntries(
    Object.entries(userData).filter(([key, value]) => value != null)
);
console.log('Object sau khi xóa null/undefined:', cleanedData);

// Xóa thuộc tính có giá trị falsy
const userData2 = { name: 'Binh', age: 0, active: false, score: '', city: 'HCM' };
console.log('\nObject ban đầu:', userData2);
const nonFalsyData = Object.fromEntries(
    Object.entries(userData2).filter(([key, value]) => value)
);
console.log('Object sau khi xóa falsy:', nonFalsyData);

console.log('\n--- 3.5. GÁN undefined VS delete ---');

const test = { a: 1, b: 2, c: 3 };
console.log('Object ban đầu:', test);

test.b = undefined;
console.log('Sau gán b = undefined:', test);
console.log('"b" in test:', 'b' in test);

delete test.c;
console.log('\nSau delete c:', test);
console.log('"c" in test:', 'c' in test);


// ========================================
console.log('\n\n=== PHẦN 3: SO SÁNH MUTATING VS NON-MUTATING ===\n');
// ========================================

console.log('--- 3.1. VÍ DỤ MUTATING ---');

const originalArr = [1, 2, 3];
const sameArr = originalArr;
sameArr.push(4);
console.log('originalArr:', originalArr); // [1, 2, 3, 4] - bị thay đổi!
console.log('sameArr:', sameArr);
console.log('originalArr === sameArr:', originalArr === sameArr); // true

console.log('\n--- 3.2. VÍ DỤ NON-MUTATING ---');

const originalArr2 = [1, 2, 3];
const newArr = [...originalArr2, 4];
console.log('originalArr2:', originalArr2); // [1, 2, 3] - không đổi
console.log('newArr:', newArr);
console.log('originalArr2 === newArr:', originalArr2 === newArr); // false

console.log('\n--- 3.3. SHALLOW COPY VS DEEP COPY ---');

const nested = { a: 1, b: { c: 2 } };
const shallowCopy = { ...nested };

shallowCopy.a = 10;
shallowCopy.b.c = 20;

console.log('Object gốc:', nested); // { a: 1, b: { c: 20 } } - b.c bị thay đổi!
console.log('Shallow copy:', shallowCopy);

// Deep copy
const nested2 = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(nested2));

deepCopy.a = 10;
deepCopy.b.c = 20;

console.log('\nObject gốc (deep copy):', nested2); // { a: 1, b: { c: 2 } } - không đổi
console.log('Deep copy:', deepCopy);

// ========================================
console.log('\n\n=== PHẦN 4: VÍ DỤ THỰC TẾ ===\n');
// ========================================

console.log('--- 4.1. QUẢN LÝ GIỎ HÀNG ---');

let cart = [
    { id: 1, name: 'Laptop', price: 1000, qty: 1 },
    { id: 2, name: 'Mouse', price: 20, qty: 2 }
];
console.log('Giỏ hàng ban đầu:', cart);

// Thêm sản phẩm mới
cart = [...cart, { id: 3, name: 'Keyboard', price: 50, qty: 1 }];
console.log('\nSau khi thêm sản phẩm:', cart);

// Sửa số lượng sản phẩm id = 2
cart = cart.map(item =>
    item.id === 2 ? { ...item, qty: 3 } : item
);
console.log('\nSau khi tăng qty của Mouse:', cart);

// Xóa sản phẩm id = 1
cart = cart.filter(item => item.id !== 1);
console.log('\nSau khi xóa Laptop:', cart);

// Tính tổng giá trị giỏ hàng
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log('\nTổng giá trị giỏ hàng:', total);

console.log('\n--- 4.2. QUẢN LÝ DANH SÁCH TODO ---');

let todos = [
    { id: 1, text: 'Học JavaScript', done: false },
    { id: 2, text: 'Làm bài tập', done: true },
    { id: 3, text: 'Đọc sách', done: false }
];
console.log('Todos ban đầu:', todos);

// Đánh dấu hoàn thành todo id = 1
todos = todos.map(todo =>
    todo.id === 1 ? { ...todo, done: true } : todo
);
console.log('\nSau khi hoàn thành todo 1:', todos);

// Xóa các todo đã hoàn thành
todos = todos.filter(todo => !todo.done);
console.log('\nSau khi xóa todo đã hoàn thành:', todos);

// Thêm todo mới
const newId = Math.max(...todos.map(t => t.id), 0) + 1;
todos = [...todos, { id: newId, text: 'Viết blog', done: false }];
console.log('\nSau khi thêm todo mới:', todos);

console.log('\n--- 4.3. CẬP NHẬT THÔNG TIN USER ---');

let userProfile = {
    id: 1,
    name: 'An',
    email: 'an@example.com',
    settings: {
        theme: 'light',
        notifications: true,
        language: 'vi'
    }
};
console.log('Profile ban đầu:', JSON.stringify(userProfile, null, 2));

// Cập nhật theme trong settings
userProfile = {
    ...userProfile,
    settings: {
        ...userProfile.settings,
        theme: 'dark'
    }
};
console.log('\nSau khi đổi theme:', JSON.stringify(userProfile, null, 2));

// Thêm thuộc tính mới
userProfile = {
    ...userProfile,
    avatar: 'https://example.com/avatar.jpg',
    settings: {
        ...userProfile.settings,
        fontSize: 'medium'
    }
};
console.log('\nSau khi thêm avatar và fontSize:', JSON.stringify(userProfile, null, 2));

console.log('\n\n=== KẾT THÚC ===');

