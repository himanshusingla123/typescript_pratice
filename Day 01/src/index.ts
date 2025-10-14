import { BankAccount } from "./bank_account.js";
import { car2, Engine } from "./engine.js";
import { Cat, Dog, type Animal } from "./inherticance.js";
import { Point } from "./point.js";
import { Product } from "./product.js";
import { Circle } from "./shape.js";
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hi, I'm ${this.name} and I'am ${this.age} years`);
  }
}

const p1 = new Person("Alice", 25);
p1.greet();

const acc = new BankAccount();
acc.deposit(1000);
console.log(" Your account balance is: ", acc.getBalanace());

const animals: Animal[] = [new Dog("Rex"), new Cat("Milo")];
animals.forEach((a) => a.makeSound());

const c = new Circle(5);
console.log(c.area());

const p = new Product(101 , 'Laptop');
// p.id = 202; // it gives error due to readonly property

console.log(new Point(5));      // (5,5)
console.log(new Point(5, 10));


const e = new Engine();
const c2 = new car2(e);

c2.drive();