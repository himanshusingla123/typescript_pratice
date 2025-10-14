export class Product {
  readonly id: number;
  name?: string;

  constructor(id: number, name?: string) {
    this.id = id;
    if (name !== undefined) {
      this.name = name;
    }
  }
}