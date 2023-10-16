import { FixedPointNumber } from "shared/types/stake"

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

function parseToFixedPointNumber(
  floatingPointString: string
): FixedPointNumber | undefined {
  if (!floatingPointString.match(/^[^0-9]*([0-9,]+)(?:\.([0-9]*))?$/)) {
    return undefined
  }

  const [whole, decimals, ...extra] = floatingPointString.split(".")

  // Only one `.` supported.
  if (extra.length > 0) {
    return undefined
  }

  const noThousandsSeparatorWhole = whole.replace(",", "")
  const setDecimals = decimals ?? ""

  try {
    return {
      amount: BigInt([noThousandsSeparatorWhole, setDecimals].join("")),
      decimals: setDecimals.length,
    }
  } catch (error) {
    return undefined
  }
}

function convertFixedPoint(
  fixedPoint: bigint,
  fixedPointDecimals: number,
  targetDecimals: number
): bigint {
  if (fixedPointDecimals >= targetDecimals) {
    return fixedPoint / 10n ** BigInt(fixedPointDecimals - targetDecimals)
  }

  return fixedPoint * 10n ** BigInt(targetDecimals - fixedPointDecimals)
}

function convertFixedPointNumber(
  { amount, decimals }: FixedPointNumber,
  targetDecimals: number
): FixedPointNumber {
  return {
    amount: convertFixedPoint(amount, decimals, targetDecimals),
    decimals: targetDecimals,
  }
}

export function userAmountToBigInt(
  amount: string,
  decimals = 18
): bigint | undefined {
  const fixedPointAmount = parseToFixedPointNumber(amount)

  if (typeof fixedPointAmount === "undefined") {
    return undefined
  }

  const decimalMatched = convertFixedPointNumber(fixedPointAmount, decimals)

  return decimalMatched.amount
}

export function bigIntToUserAmount(
  amount: bigint,
  decimals = 18,
  desiredDecimals = 2
): string {
  const desiredDecimalsAmount =
    amount / 10n ** BigInt(Math.max(1, decimals - desiredDecimals))

  return (
    Number(desiredDecimalsAmount) /
    10 ** Math.min(desiredDecimals, decimals)
  ).toString()
}

/**
 * Checks the validity of the entered value from input for token amount.
 * The value shouldn't be:
 * - a empty string
 * - a string or other non-numeric value
 * - equal or less than zero.
 */
export function isValidInputAmount(amount: string): boolean {
  return (
    !!amount.trim() &&
    !Number.isNaN(parseFloat(amount)) &&
    parseFloat(amount) > 0
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

export function queueMicrotask<T extends () => unknown>(callback: T) {
  return Promise.resolve().then(callback)
}

export function createImageElement(source: string) {
  const image = new Image()
  image.src = source

  return image
}
