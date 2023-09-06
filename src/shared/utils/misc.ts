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

// TODO Formatting functions should be improved.
// Currently there is a problem with formatting floating point numbers
export function userAmountToBigInt(amount: number, decimals = 18): bigint {
  return BigInt(amount) * 10n ** BigInt(decimals)
}

export function bigIntToUserAmount(
  amount: bigint,
  decimals = 18,
  desiredDecimals = 2
): number {
  const desiredDecimalsAmount =
    amount / 10n ** BigInt(Math.max(1, decimals - desiredDecimals))

  return (
    Number(desiredDecimalsAmount) / 10 ** Math.min(desiredDecimals, decimals)
  )
}

/**
 * Checks the validity of the entered value from input for token amount.
 * The value shouldn't be:
 * - a empty string
 * - a string or other non-numeric value
 * - less than zero.
 */
export function isValidInputAmount(amount: string): boolean {
  return (
    !amount.trim() ||
    Number.isNaN(parseFloat(amount)) ||
    parseFloat(amount) <= 0
  )
}

export function encodeJSON(input: unknown): string {
  return JSON.stringify(input, (_, value) => {
    if (typeof value === "bigint") {
      return { B_I_G_I_N_T: value.toString() }
    }
    return value
  })
}
