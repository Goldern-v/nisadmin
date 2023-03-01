/**判断target的类型 */
export function isOfType<T>(
  target: unknown,
  prop: keyof T
): target is T {
  if (!target) return false
  return (target as T)[prop] !== undefined;
}