import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email:z.email(),
  isActive: z.boolean()
});

export type User = z.infer<typeof UserSchema>;