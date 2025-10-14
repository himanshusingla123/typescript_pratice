import { UserSchema } from "./userSchema.js";

export class User {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    const parsed = UserSchema.safeParse({ name, age });
    if (!parsed.success) {
        console.error(parsed.error.flatten().fieldErrors)
      throw new Error("User validation failed");
    }

    this.name = parsed.data.name;
    this.age = parsed.data.age;
  }

  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }
}
