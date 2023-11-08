export const separateThousandsByComma = (
  value: number | bigint | string
): string => {
  const adjustedValue = typeof value === "string" ? +value : value
  return adjustedValue.toLocaleString("en-US", { maximumFractionDigits: 2 })
}

// Generates a random integer in min-max range (inclusively)
export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
