import { deepFreezeObjects } from "./deepfreeze_obj.js";
import { filterByProperty } from "./filter_obj.js";

type User = {
  id: number;
  name: string;
  active: boolean;
};

const users: User[] = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true },
];

const person = {
  name: "Alice",
  address: {
    city: "Paris",
    zip: 12345
  }
};


const activeUsers = filterByProperty(users, "active" , true);
console.log(activeUsers);

const frozen = deepFreezeObjects(person);
// frozen.address.city = "London";

console.log(frozen);