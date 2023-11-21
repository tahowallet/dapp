import { DAY, HOUR, XP_COMING_SOON_TEXT } from "shared/constants"

/**
 * @param time time in ms
 * @returns time left in MM:SS format
 */
export const formatTime = (time: number): string =>
  new Date(time).toISOString().slice(14, 19)

// The function displays the date in the format: 24 OCT
export const formatDate = (date: Date): string =>
  date
    .toLocaleString("en-GB", {
      month: "short",
      day: "numeric",
    })
    .toUpperCase()

// This function calculates time remaining in the format: X days Y minutes remaining
export const getTimeRemaining = (endDate: Date): string => {
  const currentTimestamp = Date.now()
  const endDateTimestamp = endDate.getTime()

  const timeRemainingTimestamp = endDateTimestamp - currentTimestamp
  const daysLeft = Math.floor(timeRemainingTimestamp / DAY)
  const hoursLeft = Math.floor(timeRemainingTimestamp / HOUR)

  let timeRemainingText: string = ""

  if (daysLeft > 0) {
    timeRemainingText += daysLeft === 1 ? "1 day " : `${daysLeft} days `
  }

  // If less than 1 hour left, display "coming soon"
  if (hoursLeft <= 0) {
    return XP_COMING_SOON_TEXT
  }

  timeRemainingText += hoursLeft === 1 ? "1 hour " : `${hoursLeft} hours `

  return `${timeRemainingText}remaining`
}
