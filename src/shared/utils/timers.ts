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

  const daysLeft = timeRemainingTimestamp / DAY
  const hoursLeft = timeRemainingTimestamp / HOUR - Math.floor(daysLeft) * 24

  // If less than 1 hour left, display "coming soon"
  if (hoursLeft < 1) {
    return XP_COMING_SOON_TEXT
  }

  let timeRemainingText = ""

  if (Math.floor(daysLeft) > 0) {
    timeRemainingText +=
      Math.floor(daysLeft) === 1 ? "1 day " : `${Math.floor(daysLeft)} days `
  }

  timeRemainingText +=
    Math.ceil(hoursLeft) === 1 ? "1 hour " : `${Math.ceil(hoursLeft)} hours `

  return `${timeRemainingText}remaining`
}

/**
 This function returns next selected day (f.e. next Thursday) and CET time
 * @param weekDay day of the week (1 = Monday, 2 = Tuesday, etc.)
 * @param hour desired hour in 24h format
 * @returns timestamp of next selected day
 */
export function getNextSelectedWeekDay(weekDay: number, hour: number) {
  const currentTimestamp = new Date()

  // Convert time to CET timezone
  currentTimestamp.setUTCHours(currentTimestamp.getUTCHours() + 1)

  const currentHour = currentTimestamp.getHours()
  const daysLeft = (weekDay - currentTimestamp.getUTCDay() + 7) % 7

  // If the today and selected day are the same and it is passed selected hour, then choose next closest day
  const daysUntilSelectedDay =
    daysLeft === 0 && currentHour >= hour ? 7 : daysLeft

  const nextSelectedDay = new Date(
    currentTimestamp.getUTCFullYear(),
    currentTimestamp.getUTCMonth(),
    currentTimestamp.getUTCDate() + daysUntilSelectedDay,
    hour,
    0,
    0
  )

  return nextSelectedDay
}
