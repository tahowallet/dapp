/* eslint-disable no-bitwise */
/* eslint-disable import/prefer-default-export */

export function getRadialGradientFromRealmColor(realmColor: string) {
  // Parse the hex value to get the individual color components
  const bigIntFromHex = parseInt(realmColor.slice(1), 16)

  // Extract the red, green, and blue components
  const r = (bigIntFromHex >> 16) & 255
  const g = (bigIntFromHex >> 8) & 255
  const b = bigIntFromHex & 255

  // Desired pattern -> radial-gradient(50% 50% at 50% 50%, rgba(18, 170, 255, 0.39) 0%, rgba(28, 163, 238, 0) 100%)
  const firstGradientStop = `rgba(${r}, ${g}, ${b}, 0.39) 0%`
  const secondGradientStop = `rgba(${r + 10}, ${g - 7}, ${b - 17}, 0) 100%`

  return `radial-gradient(50% 50% at 50% 50%, ${firstGradientStop}, ${secondGradientStop})`
}
