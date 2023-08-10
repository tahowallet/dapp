export const isBrowser = typeof window !== "undefined"

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-5)}`
}

export function noop() {}
