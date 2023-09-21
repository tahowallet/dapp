/**
 *
 * @param stakingTime timestamp when user staked on to the region
 * @returns time left in HH:MM format
 */
// eslint-disable-next-line import/prefer-default-export
export const calculateTimeLeftInHHMMFormat = (stakingTime: number): string => {
  const timeLeft = 3600 - Math.ceil((Date.now() - stakingTime) / 1000)

  return new Date(timeLeft * 1000).toISOString().slice(14, 19)
}
