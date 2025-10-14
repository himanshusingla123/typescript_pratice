import { User } from "./user.js";
import {
  EmailSchema,
  PositiveInt,
  PositiveNumbersArray,
  StatusSchema,
} from "./userSchema.js";

try {
  const u1 = new User("Tim", 10);
  console.log(`Name and age of user is: ${u1.getName()}, ${u1.getAge()}`);
  const badUser = new User("Bob", "25" as unknown as number);
} 
catch (err) {
  console.error("Age must be a positive number", err);
}

try {
  console.log("Positive int: ", PositiveInt.parse(42));
  console.log("Negative test: ", PositiveInt.parse(-5));
} catch (err) {
  console.log("PositiveInt failed: ");
}

console.log("Status:", StatusSchema.parse("completed"));

console.log("Email (valid):", EmailSchema.parse("test@example.com"));

console.log("Email (optional):", EmailSchema.parse(undefined));

console.log("Positive Array:", PositiveNumbersArray.parse([1, 2, 3]));
