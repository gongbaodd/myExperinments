"not supported in node";

var s = "Hello world!";

console.log(s.startsWith("world", 6)) // true
console.log(s.endsWith("Hello", 5)) // true
console.log(s.includes("Hello", 6)) // false

var name = 'jian';
var a = `hello
${name},
it a  string`;

console.log(a);
/////////////////////////////////////////
var a = 5;
var b = 10;

function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(v1);
  console.log(v2);

  return "OK";
}

tag`Hello ${ a + b } world ${ a * b}`;
// "Hello "
// " world "
// 15
// 50
// "OK"
