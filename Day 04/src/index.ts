import { deepFreezeObjects } from "./deepfreeze_obj.js";
import { filterByProperty } from "./filter_obj.js";
import { safeJsonParse } from "./Result_obj.js";

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


const data = safeJsonParse<{ name: string }>('{"name": "Alice"}');

if (data.ok) {
  console.log("✅ Parsed successfully:", data.value.name);
} else {
  console.error("❌ Parse error:", data.error.message);
}