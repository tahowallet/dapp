/**
 * @param time time in ms
 * @returns time left in MM:SS format
 */
export const formatTime = (time: number): string =>
  new Date(time).toISOString().slice(14, 19)

// The function displays the date in the format: 24 OCT
export const printData = (date: Date): string =>
  date.toLocaleString("default", {
    month: "short",
    day: "numeric",
  })
