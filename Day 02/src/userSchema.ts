import {z} from 'zod';

export const UserSchema = z.object({
    name: z.string(),
    age:z.number().min(0 , {message: "Age cannot be negative"})
});

export const PositiveInt = z.number().int().positive();

export const StatusSchema = z.enum(["pending", "completed" , "failed"]);

export const EmailSchema = z.email().optional();

export const PositiveNumbersArray = z.array(z.number().positive());