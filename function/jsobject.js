const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);
console.log(searchParams);

// Iterating the search parameters
for (const p of searchParams) {
	console.log(p);
}