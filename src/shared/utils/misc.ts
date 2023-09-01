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

export function userAmountToBigInt(amount: bigint, decimals = 18): bigint {
  return amount * 10n ** BigInt(decimals)
}

export function bigIntToUserAmount(amount: bigint, decimals = 18): bigint {
  return amount / 10n ** BigInt(decimals)
}

export function isValidInputAmount(amount: string): boolean {
  return (
    !amount.trim() ||
    Number.isNaN(parseFloat(amount)) ||
    parseFloat(amount) <= 0
  )
}
