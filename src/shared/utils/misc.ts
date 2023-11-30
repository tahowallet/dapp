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

/**
 * Checks the validity of the entered value from input for token amount.
 * The value shouldn't be:
 * - null
 * - equal or less than zero.
 * - an empty string
 * - a string or other non-numeric value
 */
export function isValidInputAmount(
  amount: string | number | bigint | null
): boolean {
  if (amount === null) {
    return false
  }

  if (typeof amount === "bigint") {
    return amount > 0n
  }

  if (typeof amount === "number") {
    return amount > 0
  }

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

// Source: https://stackoverflow.com/questions/38679681/getting-a-file-type-from-url
export async function determineFetchedFileType(
  url: string
): Promise<string | null> {
  const response = await fetch(url, { method: "HEAD" })
  const fileType = response.headers.get("Content-Type")

  return fileType
}
