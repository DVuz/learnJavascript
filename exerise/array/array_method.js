const numberArray = [5, 12, 8, 130, 44];
const stringArray = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const string = "Hello, World!";

//1. print each number in the array using forEach
numberArray.forEach(number => console.log(number));

//2. print each number with its index using forEach
numberArray.forEach((number, index) => console.log(`Index: ${index}, Number: ${number}`));

//3. calculate the sum of all numbers in the array using forEach
let sum = 0;
numberArray.forEach(number => {
	sum += number;
})
console.log(sum);

//4. double each number in the array using forEach and print the new values
(numberArray.forEach((number=>number*2)));
// This line does not modify the original array or create a new one. forEach does not return a new array.
numberArray.forEach(number =>{
	console.log(number *2)
});

//5. print only the strings that have more than 5 characters using forEach
stringArray.forEach(string =>{
	if(string.length > 5){
		console.log(string);
	}
})
//6. calculate the total number of characters in all strings using forEach
let countSum = 0;
stringArray.forEach(string =>{
	countSum += string.length;
})
console.log(countSum);

//7.
const listedChars = [];
stringArray.forEach(string =>{
	for(let char of string){
		if(!listedChars.includes(char)){
			listedChars.push(char);
		}
	}
})
console.log(listedChars);