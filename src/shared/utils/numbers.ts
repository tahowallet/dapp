import { FixedPointNumber } from "shared/types/stake"

// Matches floating point numbers with optional thousands separators
const FLOATING_POINT_REGEX = /^[^0-9]*([0-9,]+)(?:\.([0-9]*))?$/

export const separateThousandsByComma = (
  value: number | bigint | string,
  noDecimals: boolean = false
): string => {
  const adjustedValue = typeof value === "string" ? +value : value

  return adjustedValue.toLocaleString("en-US", {
    minimumFractionDigits: noDecimals ? 0 : 2,
  })
}

function parseToFixedPointNumber(
  floatingPointString: string
): FixedPointNumber | undefined {
  if (!floatingPointString.match(FLOATING_POINT_REGEX)) {
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

// Parse token amount by moving the decimal point
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

// Parse token amount by moving the decimal point and separate thousands by comma
export function bigIntToDisplayUserAmount(
  amount: bigint | string,
  decimals = 18,
  desiredDecimals = 2
): string {
  const amountBigInt = typeof amount === "string" ? BigInt(amount) : amount

  return separateThousandsByComma(
    bigIntToUserAmount(amountBigInt, decimals, desiredDecimals)
  )
}
