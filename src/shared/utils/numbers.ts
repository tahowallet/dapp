// eslint-disable-next-line import/prefer-default-export
export const separateThousandsByComma = (value: number): string =>
  value.toLocaleString("en-US", { maximumFractionDigits: 2 })
