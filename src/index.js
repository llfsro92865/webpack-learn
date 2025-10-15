import "./index.less";
import { Vonder } from "./vonder.js";

console.log("hello webpack", Vonder);

// src/index.js
// const add = (a, b) => a + b;
// class Foo {
//   bar = 1;
// }

// console.log(add(1, 2));

// const foo = new Foo();

const fn = (a) => a ** 2;
console.log(fn(8));
