// Matches floating point numbers with optional thousands separators
export const FLOATING_POINT_REGEX = /^[^0-9]*([0-9,]+)(?:\.([0-9]*))?$/

// Matches number values and empty string
export const NUMBER_INPUT_REGEX = /^-?\d*(\.\d+)?$/
