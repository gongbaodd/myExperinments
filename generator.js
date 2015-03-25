//function* f() {
//  for(var i=0; true; i++) {
//    var reset = yield i;
//    if(reset) { i = -1; }
//  }
//}
//
//var g = f();
//
//g.next() // { value: 0, done: false }
//g.next() // { value: 1, done: false }
//g.next(true) // { value: 0, done: false }

//function* g(){
//  try {
//        var a = yield foo('a');
//        var b = yield foo('b');
//        var c = yield foo('c');
//    } catch (e) {
//        console.log(e);
//    }
//
//  console.log(a, b, c);
//
//}
//
//var fun = g();
//
//setInterval(()=>fun.next(),1000);

function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e
