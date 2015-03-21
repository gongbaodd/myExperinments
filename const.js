"use strict";

const foo = {};
foo.prop = 123;
console.log(foo);

const foo2 = Object.freeze({});
try{
    foo2.prop = 123;
}catch(e){
    console.log(e);
}
console.log(foo2);
