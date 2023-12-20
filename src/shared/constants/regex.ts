/* eslint-disable no-useless-escape */

// Matches floating point numbers with optional thousands separators
export const FLOATING_POINT_REGEX = /^[^0-9]*([0-9,]+)(?:\.([0-9]*))?$/

// Matches number values and empty string
export const NUMBER_INPUT_REGEX = /^-?[0-9]*\.?[0-9]*$/

// Matches valid email
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
