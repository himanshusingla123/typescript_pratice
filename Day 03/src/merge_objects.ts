// object spread: it is type safe and preserves propert types
export function mergeObject1<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// object.assign(): equivalent to spread
// ❌ Doesn’t create deep clones — only shallow merge
export function mergeObject2<T, U>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}

// constrained version (only objects allowed)
// to prevent non-object arguments like mergeObjects(5, "x")
// still type safe
export function mergeObject3<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}

// ✅ Deep merges nested objects
// ✅ Preserves exact merged type
// ❌ Slightly complex but powerful for libraries
type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? K extends keyof T
      ? DeepMerge<T[K], U[K]> // both have K → merge recursively
      : U[K]
    : K extends keyof T
    ? T[K]
    : never;
};

export function mergeObject4<T extends object, U extends object>(
  obj1: T,
  obj2: U
): DeepMerge<T, U> {
  const result: any = { ...obj1 };
  for (const key in obj2) {
    const val1 = result[key];
    const val2 = obj2[key];
    if (val1 && typeof val1 == "object" && val2 && typeof val2 == "object") {
      result[key] = mergeObject4(val1, val2);
    } else {
      result[key] = obj2[key];
    }
  }
  return result;
}

// FUNCTIONAL STYLE(REDUCE-BASED)
// can merge two objects in a pipeline
// extendable to more arguments
export function mergeObject5<T extends object, U extends object>(
  ...objs: [T, U]
): T & U {
  return objs.reduce((acc, cur) => ({ ...acc, ...cur }), {}) as T & U;
}

// You can extract the logic into a reusable utility type + function pair
// Makes generic type reusable (Merge<T, U>)
// Same logic, but cleaner structure
type Merge<T, U> = T & U;

export function mergeObject6<T, U>(a: T, b: U): Merge<T, U> {
  return { ...a, ...b };
}
