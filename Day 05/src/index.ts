import { DataStore } from "./data_store.js";
import { EventEmitter } from "./event_emitter.js";
import type { EventMap } from "./event_emitter.js";
import { pluck } from "./pluck_list.js";

interface MyEvents extends EventMap {
  message: (text: string) => void;
  add: (a: number, b: number) => number;
}

const ee = new EventEmitter<MyEvents>();

const unsub = ee.on("message", (t) => console.log("msg: ", t));

ee.on("add", (a, b) => {
  console.log("sum", a + b);
  return a + b;
});

ee.emit("message", "hello world");

unsub();

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: "admin" | "editor" | "viewer";
  isActive: boolean;
}
try{
const userStore = new DataStore<User>();
userStore.add({
  id: 1,
  name: "Himanshu Singla",
  email: "himanshu@example.com",
  age: 23,
  role: "admin",
  isActive: true,
});

userStore.add({
  id: 2,
  name: "Jai Viru",
  email: "aditi@example.com",
  age: 25,
  role: "editor",
  isActive: false,
});


const user = userStore.get(1);
console.log(user?.name); 

// Update a user

userStore.update(3, { isActive: true });

// Delete a user
userStore.delete(1);

// Get all users
console.log(userStore.getAll());
}
catch(err)
{
    if(err instanceof Error)
    {
        console.error(err.message);
    }
}

interface User1 { id: number; name: string; email: string }
const users: User1[] = [
  { id: 1, name: "A", email: "a@example.com" },
  { id: 2, name: "B", email: "b@example.com" },
];

const names = pluck(users, "name"); 
const ids   = pluck(users, "id");  
console.log(names)
console.log(ids)
