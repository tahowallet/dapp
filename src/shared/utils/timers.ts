/**
 *
 * @param eventTime timestamp when the specified event happened
 * @param cooldownTime cooldown time in miliseconds
 * @returns time left in HH:MM format
 */
// eslint-disable-next-line import/prefer-default-export
export const calculateTimeLeft = (
  eventTime: number,
  cooldownTime: number
): string => {
  const timeLeft = cooldownTime - Math.ceil(Date.now() - eventTime)

  return new Date(timeLeft).toISOString().slice(14, 19)
}
