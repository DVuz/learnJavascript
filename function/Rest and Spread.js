// =====================================================
// REST vs SPREAD OPERATORS - Chi tiết với ví dụ
// =====================================================

console.log('=== REST PARAMETER ===');

// 1. REST PARAMETER - Thu thập các tham số thành mảng
// Cú pháp: ...variableName (trong parameter list)

// Ví dụ 1: Thu thập tất cả tham số
function logAll(...args) {
	// args là một Array chứa tất cả tham số được truyền vào
	console.log('Tất cả tham số:', args);
	console.log('Số lượng tham số:', args.length);
	console.log('Kiểu của args:', Array.isArray(args)); // true
}

logAll('a', 'b', 'c', 'd');
// Tất cả tham số: ['a', 'b', 'c', 'd']
// Số lượng tham số: 4

// Ví dụ 2: Kết hợp tham số thường với rest
function greetUsers(greeting, ...names) {
	// greeting là tham số đầu tiên
	// names là Array chứa tất cả tham số còn lại
	console.log(`${greeting}: ${names.join(', ')}`);
}

greetUsers('Xin chào', 'An', 'Bình', 'Châu');
// Xin chào: An, Bình, Châu

// Ví dụ 3: Tính tổng với số lượng tham số không xác định
function sum(...numbers) {
	// Sử dụng reduce để tính tổng tất cả số
	return numbers.reduce((total, num) => total + num, 0);
}

console.log('Tổng:', sum(1, 2, 3, 4, 5)); // Tổng: 15
console.log('Tổng:', sum(10, 20)); // Tổng: 30

// LỖI THƯỜNG GẶP: Rest parameter phải là tham số cuối cùng
// function invalid(a, ...rest, b) {} // SyntaxError!

console.log('\n=== SPREAD OPERATOR ===');

// 2. SPREAD OPERATOR - Mở rộng iterable thành các phần tử riêng lẻ
// Cú pháp: ...iterable (trong function call, array literal, object literal)

// A. SPREAD trong Array

// Ví dụ 1: Mở rộng mảng khi gọi hàm
const numbers = [1, 2, 3, 4, 5];
console.log('Dùng spread trong function call:');
console.log('sum(...numbers):', sum(...numbers)); // Tương đương sum(1,2,3,4,5)

// Ví dụ 2: Sao chép mảng (shallow copy)
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray]; // Tạo mảng mới
console.log('Mảng gốc:', originalArray);
console.log('Mảng copy:', copiedArray);
console.log('Có phải cùng reference?', originalArray === copiedArray); // false

// Ví dụ 3: Nối mảng
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const combined = [...arr1, ...arr2, ...arr3];
console.log('Nối mảng:', combined); // [1, 2, 3, 4, 5, 6]

// Ví dụ 4: Thêm phần tử vào mảng
const fruits = ['apple', 'banana'];
const moreFruits = ['orange', ...fruits, 'grape'];
console.log('Thêm phần tử:', moreFruits); // ['orange', 'apple', 'banana', 'grape']

// Ví dụ 5: Tìm max/min trong mảng
const scores = [85, 92, 78, 96, 88];
console.log('Điểm cao nhất:', Math.max(...scores)); // 96
console.log('Điểm thấp nhất:', Math.min(...scores)); // 78

// B. SPREAD trong Object (ES2018+)

console.log('\n=== SPREAD với OBJECT ===');

// Ví dụ 1: Sao chép object
const person = { name: 'An', age: 25 };
const copiedPerson = { ...person };
console.log('Person gốc:', person);
console.log('Person copy:', copiedPerson);
console.log('Có phải cùng reference?', person === copiedPerson); // false

// Ví dụ 2: Merge objects
const basicInfo = { name: 'Bình', age: 30 };
const contactInfo = { email: 'binh@email.com', phone: '123456' };
const fullInfo = { ...basicInfo, ...contactInfo };
console.log('Thông tin đầy đủ:', fullInfo);

// Ví dụ 3: Override properties
const defaultSettings = { theme: 'light', language: 'vi' };
const userSettings = { theme: 'dark' };
const finalSettings = { ...defaultSettings, ...userSettings };
console.log('Cài đặt cuối:', finalSettings); // theme bị override thành 'dark'

// Ví dụ 4: Thêm properties mới
const student = { name: 'Châu', grade: 'A' };
const studentWithId = { id: 1001, ...student, semester: 'Fall 2024' };
console.log('Student với thêm info:', studentWithId);

console.log('\n=== SO SÁNH REST vs SPREAD ===');

// Cùng cú pháp ... nhưng mục đích ngược nhau:
// - REST: Thu thập nhiều thành một (collect)
// - SPREAD: Mở rộng một thành nhiều (expand)

function demonstrateRestSpread(first, ...rest) {
	// ...rest ở đây là REST (collect các tham số thành mảng)
	console.log('Tham số đầu:', first);
	console.log('Các tham số còn lại:', rest);

	// ...rest ở đây là SPREAD (expand mảng thành các tham số riêng)
	return sum(...rest);
}

const result = demonstrateRestSpread('label', 10, 20, 30);
console.log('Kết quả:', result); // 60

console.log('\n=== VÍ DỤ THỰC TẾ ===');

// Ví dụ 1: Function utility để merge arrays
function mergeArrays(...arrays) {
	// REST: thu thập tất cả mảng được truyền vào
	return arrays.reduce((merged, arr) => [...merged, ...arr], []);
	//                                    ↑ SPREAD để nối mảng
}

const result1 = mergeArrays([1, 2], [3, 4], [5, 6]);
console.log('Merge arrays:', result1); // [1, 2, 3, 4, 5, 6]

// Ví dụ 2: Function để tạo user profile
function createProfile(name, email, ...socialLinks) {
	// REST: thu thập các social links
	return {
		name,
		email,
		social: socialLinks,
		createdAt: new Date()
	};
}

const profile = createProfile('Dung', 'dung@email.com', 'facebook.com/dung', 'twitter.com/dung');
console.log('Profile:', profile);

// Ví dụ 3: Immutable array operations
const todoList = ['học JS', 'làm bài tập'];

// Thêm todo mới (không mutate original array)
const addTodo = (todos, newTodo) => [...todos, newTodo];
const newTodoList = addTodo(todoList, 'đi chơi');
console.log('Todo list cũ:', todoList);
console.log('Todo list mới:', newTodoList);

// Xóa todo (không mutate)
const removeTodo = (todos, index) => [
	...todos.slice(0, index),
	...todos.slice(index + 1)
];
const afterRemove = removeTodo(newTodoList, 1);
console.log('Sau khi xóa:', afterRemove);

console.log('\n=== LƯU Ý QUAN TRỌNG ===');

// 1. Spread chỉ tạo shallow copy
const nestedArray = [[1, 2], [3, 4]];
const shallowCopy = [...nestedArray];
shallowCopy[0][0] = 999; // Thay đổi này ảnh hưởng đến original!
console.log('Original sau khi modify copy:', nestedArray); // [[999, 2], [3, 4]]

// 2. Rest parameter với destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log('Head:', head); // 1
console.log('Tail:', tail); // [2, 3, 4, 5]

const { name, ...otherProps } = { name: 'An', age: 25, city: 'HN' };
console.log('Name:', name); // 'An'
console.log('Other props:', otherProps); // { age: 25, city: 'HN' }

// 3. Performance: Spread có thể chậm với mảng/object lớn
// Với mảng rất lớn, consider dùng Array.from() hoặc methods khác

console.log('\n=== KẾT LUẬN ===');
console.log('✓ REST (...args): Thu thập parameters thành array');
console.log('✓ SPREAD (...array): Mở rộng iterable thành elements riêng lẻ');
console.log('✓ Cùng syntax ... nhưng context quyết định ý nghĩa');
console.log('✓ REST chỉ trong parameter list, SPREAD trong expressions');
