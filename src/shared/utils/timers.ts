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

export const convertDateToUTCTimezone = () => {
  const currentDate = new Date()
  currentDate.setUTCHours(currentDate.getUTCHours())

  return currentDate
}

// This function calculates time remaining in the format: X days Y minutes remaining
export const getTimeRemaining = (endDate: Date): string => {
  const currentDate = convertDateToUTCTimezone()
  const endDateTimestamp = endDate.getTime()

  const currentTimestamp = currentDate.getTime()

  const timeRemainingTimestamp = endDateTimestamp - currentTimestamp

  const daysLeft = timeRemainingTimestamp / DAY
  const hoursLeft = timeRemainingTimestamp / HOUR - Math.floor(daysLeft) * 24

  // If 24h hours left, convert it to one day
  const adjustedDaysLeft = Math.ceil(hoursLeft) === 24 ? daysLeft + 1 : daysLeft

  // If less than 1 hour left, display "coming soon"
  if (Math.floor(daysLeft) === 0 && hoursLeft < 1) {
    return XP_COMING_SOON_TEXT
  }

  let timeRemainingText = ""

  if (Math.floor(adjustedDaysLeft) > 0) {
    timeRemainingText +=
      Math.floor(adjustedDaysLeft) === 1
        ? "1 day "
        : `${Math.floor(adjustedDaysLeft)} days `
  }

  if (Math.ceil(hoursLeft) !== 24) {
    timeRemainingText += `${Math.ceil(hoursLeft)} hours ` // if smaller than 1 hour, we display "XP drop coming soon"
  }

  return `${timeRemainingText}remaining`
}

/**
 This function returns next selected day (f.e. next Thursday)
 * @param weekDay day of the week (1 = Monday, 2 = Tuesday, etc.)
 * @param hour desired hour in 24h format
 * @returns timestamp of next selected day
 */
export function getNextSelectedWeekDay(weekDay: number, hour: number) {
  const currentDate = convertDateToUTCTimezone()
  const adjustedHour = hour - currentDate.getTimezoneOffset() / 60

  const currentHour = currentDate.getHours()
  const daysLeft = (weekDay - currentDate.getUTCDay() + 7) % 7

  // If the today and selected day are the same and it is passed selected hour, then choose next closest day
  const daysUntilSelectedDay =
    daysLeft === 0 && currentHour >= adjustedHour ? 7 : daysLeft

  const nextSelectedDay = new Date(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate() + daysUntilSelectedDay,
    adjustedHour,
    0,
    0
  )

  return nextSelectedDay
}
