import { deepMerge } from "@cross/deepmerge";

/**
 * Creates a builder function for a given base object type.
 *
 * @template T The type of the base object
 * @param baseProps The base object containing default properties
 * @returns A function that accepts partial overrides and returns a merged object
 *
 * @example
 * ```typescript
 * type User = {
 *   name: string;
 *   age: number;
 * }
 *
 * const baseUser = { name: '', age: 0 };
 * const buildUser = builderFor<User>(baseUser);
 *
 * const user = buildUser({ name: 'John' }); // { name: 'John', age: 0 }
 * ```
 */
export function builderFor<T>(baseProps: T): (override?: DeepPartial<T>) => T {
  return function <O extends DeepPartial<T>>(override?: O): T {
    if (!override) {
      return baseProps;
    }
    return deepMerge<T>(baseProps, override as T);
  };
}

/**
 * Makes all properties in T optional, recursively.
 *
 * @template T The type to make deeply partial
 *
 * @example
 * type User = {
 *   name: string;
 *   settings: {
 *     theme: string;
 *     notifications: boolean;
 *   }
 * }
 *
 * // Allows partial updates like:
 * // { settings: { theme: 'dark' } }
 * type PartialUser = DeepPartial<User>;
 */
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
