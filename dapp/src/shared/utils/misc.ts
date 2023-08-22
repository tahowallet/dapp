export const isBrowser = typeof window !== "undefined"

export function noop() {}

export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}
