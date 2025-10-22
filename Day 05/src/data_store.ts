export class DataStore<T extends { id: string | number }> {
  private items: Map<string | number, T> = new Map();

  add(item: T): void {
    if (this.items.has(item.id)) {
      throw new Error(`Item with id ${item.id} already exists`);
    }
    this.items.set(item.id, item);
  }

  get(id: string | number): T | undefined {
    return this.items.get(id);
  }

  update(id: string | number, updatedFields: Partial<T>): void {
    const existing = this.items.get(id);
    if (!existing) {
      throw new Error(`Item with id ${id} not found`);
    }
    this.items.set(id, { ...existing, ...updatedFields });
  }

  delete(id: string | number): void {
    if (!this.items.delete(id)) {
      throw new Error(`Item with id ${id} not found`);
    }
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }
}
