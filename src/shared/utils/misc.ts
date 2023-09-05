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

export function encodeJSON(input: unknown): string {
  return JSON.stringify(input, (_, value) => {
    if (typeof value === "bigint") {
      return { B_I_G_I_N_T: value.toString() }
    }
    return value
  })
}
