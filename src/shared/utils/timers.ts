/**
 * @param time time in ms
 * @returns time left in MM:SS format
 */
// eslint-disable-next-line import/prefer-default-export
export const formatTime = (time: number): string =>
  new Date(time).toISOString().slice(14, 19)
