var map = new Map([ ["name", "张三"], ["title", "Author"]]);

console.log(map.size) // 2
console.log(map.has("name")) // true
console.log(map.get("name")) // "张三"
console.log(map.has("title")) // true
console.log(map.get("title")) // "Author"
