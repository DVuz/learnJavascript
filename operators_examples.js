// Ví dụ minh họa cho các khái niệm trong operators_explained_vi.md
console.log('--- NaN và kiểm tra NaN ---');
console.log('0/0 =>', 0/0);
console.log("Number('abc') =>", Number('abc'));
console.log('NaN === NaN =>', NaN === NaN);
console.log('Object.is(NaN, NaN) =>', Object.is(NaN, NaN));

console.log('\n--- isNaN vs Number.isNaN ---');
console.log("isNaN('foo') =>", isNaN('foo'));
console.log("Number.isNaN('foo') =>", Number.isNaN('foo'));
console.log("isNaN('') =>", isNaN(''));
console.log("Number.isNaN('') =>", Number.isNaN(''));
console.log("isNaN(NaN) =>", isNaN(NaN));
console.log("Number.isNaN(NaN) =>", Number.isNaN(NaN));

console.log('\n--- ++i vs i++ ---');
let i = 1;
console.log('i = 1; console.log(++i) =>', (() => { i = 1; return ++i; })());
console.log('i = 1; console.log(i++) =>', (() => { i = 1; return i++; })(), ' (after op i =', i, ')');

console.log('\n--- Bitwise examples ---');
console.log('5 & 3 =>', 5 & 3);
console.log('5 | 2 =>', 5 | 2);
console.log('~0 =>', ~0);
console.log('1.9 | 0 =>', 1.9 | 0);
console.log('-1 >>> 0 =>', -1 >>> 0);

console.log('\n--- typeof vs instanceof ---');
console.log("typeof 123 =>", typeof 123);
console.log("typeof 's' =>", typeof 's');
console.log('typeof function(){} =>', typeof function(){});
console.log('typeof null =>', typeof null);
console.log('[] instanceof Array =>', [] instanceof Array);
console.log('{} instanceof Object =>', {} instanceof Object);
console.log('null instanceof Object =>', null instanceof Object);

console.log('\n--- in operator ---');
const o = { a: undefined };
console.log("'a' in o =>", 'a' in o);
console.log("'b' in o =>", 'b' in o);
const arr = [10,20];
console.log('0 in [10,20] =>', 0 in arr);
console.log('2 in [10,20] =>', 2 in arr);

console.log('\n--- delete operator ---');
const obj = { a: 1, b: 2 };
console.log('before delete obj.a =>', obj);
delete obj.a;
console.log('after delete obj.a =>', obj);
const arr2 = [1,2,3];
delete arr2[1];
console.log('after delete arr2[1] =>', arr2, 'length =', arr2.length);

console.log('\n--- void operator ---');
function foo(){ return 42; }
console.log('foo() =>', foo());
console.log('void foo() =>', void foo());
console.log('void 0 =>', void 0);

console.log('\n--- ?? vs || ---');
const x = 0;
console.log('x || 42 =>', x || 42);
console.log('x ?? 42 =>', x ?? 42);
const s = '';
console.log("s || 'default' =>", s || 'default');
console.log("s ?? 'default' =>", s ?? 'default');

console.log('\n--- Optional chaining (?.) ---');
const nested = { a: { b: 1 }, f: () => 3 };
console.log('nested?.a?.b =>', nested?.a?.b);
console.log('nested?.x?.y =>', nested?.x?.y);
console.log('nested?.f?.() =>', nested?.f?.());
const maybeFunc = null;
console.log('maybeFunc?.() =>', maybeFunc?.());

console.log('\n--- Kết thúc ví dụ ---');

