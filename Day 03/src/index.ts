import { mergeObject4 } from "./merge_objects.js";
import { reversedArray } from "./reverse_array.js";

const arr1 = reversedArray(["abc","cde","efg"]);

const obj1 = {a: 1, b:{x:10}};
const obj2 = {b:{y:20}, c:3};
const merged = mergeObject4(obj1, obj2);
console.log(merged)