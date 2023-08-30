export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-5)}`.toLowerCase()
}

export function normalizeAddress(address: string): string {
  return address.toLowerCase()
}

export function isSameAddress(a: string, b: string): boolean {
  return normalizeAddress(a) === normalizeAddress(b)
}

export function isProbablyEVMAddress(str: string): boolean {
  if (str.toLowerCase().startsWith("0x") && str.length === 42) {
    return true
  }
  return false
}
