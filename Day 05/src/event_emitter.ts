export type EventMap = Record<PropertyKey, (...args: any[]) => any>;

export class EventEmitter<Events extends EventMap> {

  private listeners = new Map<keyof Events, Set<Events[keyof Events]>>();

  on<K extends keyof Events>(event: K, listener: Events[K]): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set<Events[K]>();
      this.listeners.set(event, set as Set<Events[keyof Events]>);
    }
    (set as Set<Events[K]>).add(listener);
    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(event: K, listener?: Events[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    if (listener) {
      (set as Set<Events[K]>).delete(listener);
      if (set.size == 0) this.listeners.delete(event);
    } 
    else {
      this.listeners.delete(event);
    }
  }

  emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): void {
    const set = this.listeners.get(event);
    if (!set) return;
    const copy = Array.from(set) as Events[K][];
    for (const listener of copy) {
      (listener as (...a: unknown[]) => unknown)(...args);
    }
  }

  listenerCount<K extends keyof Events>(event: K): number {
    return this.listeners.get(event)?.size ?? 0;
  }

  clear(): void {
    this.listeners.clear();
  }
}
