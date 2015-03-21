"use strict";

var a = [];
for (var i = 0; i < 10; i++){
    a[i] = function () {
        console.log('without let:'+i);
    }
}
a[5]();

var a = [];
for (let i = 0; i < 10; i++){
    a[i] = function () {
        console.log('with let:'+i);
    }
}
a[5]();

"6to5";
var a = [];
for (var i = 0; i < 10; i++) {
    (function (i) {
        a[i] = function () {
            console.log("with closure:" + i);
        };
    })(i);
}
a[5]();
