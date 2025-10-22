import {z} from 'zod'
import { UserSchema, type User } from "./UserSchema.js";
const user1 = {
  id: 1,
  name: "QQwerty",
  email: "abc@gmail.com",
  isActive: true,
};

function isCheck<T>(data: T) {
  try {
    const parsed = UserSchema.parse(data);
    console.log(parsed);
  } catch (err) {
    if(err instanceof Error)
    {
        console.error(err.message)
    }
  }
}

isCheck(user1);

// -----------------Second way------------------------------
function validateUser(data:unknown):User|null{
    try{const parsedUser = UserSchema.parse(data);
    return parsedUser;}
    catch(err)
    {
        console.error(err instanceof z.ZodError ? err.message : err)
        return null
    }
}

const result = validateUser(user1);

if (result) {
  console.log(result.name); // ✅ Type-safe
}