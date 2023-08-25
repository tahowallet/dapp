export const isBrowser = typeof window !== "undefined"

export function noop() {}

export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function filterObject<T extends Record<string, unknown>>(
  obj: T,
  predicate: (key: string, value: unknown) => boolean
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => predicate(key, value))
  ) as Record<string, unknown>
}

type PickDefined<T> = { [K in keyof T]: T[K] extends undefined ? never : T[K] }

export function filterUndefinedProps<T extends Record<string, unknown>>(
  obj: T
): PickDefined<T> {
  return filterObject(obj, (_, value) => value !== undefined) as PickDefined<T>
}

export function userAmountToBigInt(amount: bigint, decimals = 18): bigint {
  return amount * 10n ** BigInt(decimals)
}

export function bigIntToUserAmount(amount: bigint, decimals = 18): bigint {
  return amount / 10n ** BigInt(decimals)
}
