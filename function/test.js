 console.log(mult(2,3)); // ReferenceError nếu dùng const/let hoặc undefined nếu var (vì hoisting biến nhưng chưa gán)
var mult = function(a, b) {
	return a * b;
};
console.log(mult(2,3)); // 6