export const isBrowser = typeof window !== "undefined"

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-5)}`.toLowerCase()
}

export function isProbablyEVMAddress(str: string): boolean {
  if (str.toLowerCase().startsWith("0x") && str.length === 42) {
    return true
  }
  return false
}

export function noop() {}

export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}
