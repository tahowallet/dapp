// eslint-disable-next-line import/prefer-default-export
export const separateThousandsByComma = (
  value: number | bigint | string
): string => {
  const adjustedValue = typeof value === "string" ? +value : value
  return adjustedValue.toLocaleString("en-US", { maximumFractionDigits: 2 })
}
