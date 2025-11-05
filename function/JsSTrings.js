let text = "Hello World! Welcome to JavaScript string manipulation.";

// 1. indexOf() - Find the position of the first occurrence of a substring
// syntax: string.indexOf(substring, startPosition)
// returns the index of the first occurrence of the specified substring, or -1 if not found.

let position = text.indexOf("JavaScript");
console.log("Index of 'JavaScript':", position); // Output: 24

/*2. slice() - Extract a section of a string and return it as a new string
	 syntax: string.slice(startIndex, endIndex)
	 returns a new string containing the extracted section from startIndex to endIndex (not inclusive).
	 without endIndex, it extracts till the end of the string.
*/
let section = text.slice(13, 23);
console.log("Sliced section:", section); // Output: "Welcome to"
console.log("Slice without end index:", text.slice(6)); // Output: "World! Welcome to JavaScript string manipulation.")