interface DateRange {
  startDate: string
  endDate: string
  [date: string]: string
}

export function changeDatesByMonth(
  direction: string, // going forward a month or back a month
  dateRange: DateRange, // the current displayed months
  type: string, // always first and last day of month, or specific dates within the month
): DateRange {
  let newDates = { startDate: '', endDate: '' }
  if (type === 'monthly') {
    Object.keys(dateRange).forEach((date: string) => {
      // REFACTOR THIS MESS
      const dateSplit = dateRange[date].split('-')
      let month = dateSplit[1]
      let year = dateSplit[0]
      // Handle month/year change
      if (direction === 'back') {
        if (month === '01') {
          month = '12'
          year = (Number(year) - 1).toString()
        } else {
          month = (Number(month) - 1).toString().padStart(2, '0')
        }
      } else {
        if (month === '12') {
          month = '01'
          year = (Number(year) + 1).toString()
        } else {
          month = (Number(month) + 1).toString().padStart(2, '0')
        }
      }
      // Handle day change
      const day =
        date === 'startDate'
          ? '01'
          : new Date(Number(year), Number(month), 0)
              .getDate()
              .toString()
              .padStart(2, '0')
      newDates = { ...newDates, [date]: `${year}-${month}-${day}` }
    })
  } else {
    Object.keys(dateRange).forEach((date: string) => {
      const dateSplit = dateRange[date].split('-')
      let month = dateSplit[1]
      let year = dateSplit[0]
      // Handle month/year change
      if (direction === 'back') {
        if (month === '01') {
          month = '12'
          year = (Number(year) - 1).toString()
        } else {
          month = (Number(month) - 1).toString().padStart(2, '0')
        }
      } else {
        if (month === '12') {
          month = '01'
          year = (Number(year) + 1).toString()
        } else {
          month = (Number(month) + 1).toString().padStart(2, '0')
        }
      }
      // Handle day change
      if (month === '02') {
        const day =
          Number(dateSplit[2]) > 29
            ? new Date(Number(year), Number(month), 0)
                .getDate()
                .toString()
                .padStart(2, '0')
            : dateSplit[2]
        newDates = { ...newDates, [date]: `${year}-${month}-${day}` }
      } else {
        const day =
          dateSplit[2] === '31'
            ? new Date(Number(year), Number(month), 0)
                .getDate()
                .toString()
                .padStart(2, '0')
            : dateSplit[2]
        newDates = { ...newDates, [date]: `${year}-${month}-${day}` }
      }
    })
  }

  return newDates
}

// function cycleDatesByYear(dateRange: DateRange): DateRange {
//   let newDates = { startDate: '', endDate: '' }
//   // Can literally just change the year, no other coding needed
//   return newDates
// }

export function getMonthAsWord(dateRange: DateRange): string[] {
  const dateMonths = {
    startDate: new Date(dateRange.startDate).toLocaleString('default', {
      month: 'long',
    }),
    endDate: new Date(dateRange.endDate).toLocaleString('default', {
      month: 'long',
    }),
  }

  return Object.values(dateMonths)
}

export function getDatesToAdd(
  dateRange: DateRange,
  frequency: string,
): string[] {
  let datesArray

  switch (frequency) {
    case 'daily':
      datesArray = getDatesByDay(dateRange, 1)
      return datesArray
    case 'weekly':
      datesArray = getDatesByDay(dateRange, 7)
      return datesArray
    case 'fortnightly':
      datesArray = getDatesByDay(dateRange, 14)
      return datesArray
    case 'monthly':
      datesArray = getDatesByMonth(dateRange, 1)
      return datesArray
    case 'fortmonthly':
      datesArray = getDatesByMonth(dateRange, 2)
      return datesArray
    case 'quarterly':
      datesArray = getDatesByMonth(dateRange, 4)
      return datesArray
    case 'bi-annually':
      datesArray = getDatesByMonth(dateRange, 6)
      return datesArray
    case 'annually':
      datesArray = getDatesByMonth(dateRange, 12)
      return datesArray
    default:
      return []
  }
}

// Return array of dates between the start date by the number of days
function getDatesByDay(dateRange: DateRange, days: number): string[] {
  const datesArray = [dateRange.startDate]

  const { [0]: year, [1]: month, [2]: day } = dateRange.startDate.split('-')
  const endDate = new Date(dateRange.endDate)
  let currentDate = new Date(dateRange.startDate)
  let currentMonth = Number(month)
  let currentDay = Number(day)

  // Loop here
  while (currentDate < endDate) {
    // get the max amount of days
    const finalDay = new Date(Number(year), Number(month), 0).getDate()
    // Add 7 days to next week
    const nextMonth = currentMonth + 1
    let nextDay = currentDay + days

    // Check if day switches over to next month
    if (nextDay > finalDay) {
      nextDay = nextDay - finalDay
      currentMonth = nextMonth
      const newMonth = currentMonth.toString().padStart(2, '0')
      // BREAK if the month is over 12
      if (Number(newMonth) > 12) {
        break
      }
      datesArray.push(
        // `${nextDay.toString().padStart(2, '0')}-${Number(month)}-${year}`,
        `${year}-${newMonth}-${nextDay.toString().padStart(2, '0')}`,
      )
    } else {
      datesArray.push(
        `${year}-${currentMonth.toString().padStart(2, '0')}-${nextDay.toString().padStart(2, '0')}`,
      )
    }
    // Make sure current date is set to the last item in the array
    currentDate = new Date(datesArray[datesArray.length - 1])
    currentDay = nextDay
  }

  const finalDate = new Date(
    datesArray[datesArray.length - 1].split('-').reverse().join('-'),
  )
  // Check if last date is over the range
  if (finalDate > endDate) {
    datesArray.pop()
  }

  return datesArray
}

// Return array of dates between the start date by the number of months
function getDatesByMonth(dateRange: DateRange, months: number): string[] {
  const datesArray = []

  console.log(dateRange)

  const { [0]: year, [1]: month, [2]: day } = dateRange.startDate.split('-')
  const endDate = new Date(dateRange.endDate)
  let currentDate = new Date(dateRange.startDate)
  const currentDay = Number(day)
  let currentMonth = Number(month)

  // Loop here
  while (currentDate < endDate) {
    // Increase month, check year
    console.log(currentDate, endDate)
    const nextMonth = currentMonth + months

    if (Number(currentMonth) > 12) {
      break
    }

    // get the max amount of days
    const finalDay = new Date(Number(year), nextMonth, 0).getDate()

    if (currentDay > finalDay) {
      // Set day to final of the month (then continue with setting it as the original?)
      datesArray.push(
        `${year}-${currentMonth.toString().padStart(2, '0')}-${finalDay.toString().padStart(2, '0')}`,
      )
    } else {
      datesArray.push(
        `${year}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`,
      )
    }

    currentDate = new Date(Number(year), currentMonth, Number(day))
    currentMonth = nextMonth
  }

  return datesArray
}

// // Return array of dates between the start date by the number of years
// function getDatesByYear(dateRange: DateRange, years: number): string[] {
//   const datesArray = []

//   return datesArray
// }

export function getNextDate(startDate: string, frequency: string): string {
  let nextDate
  switch (frequency) {
    case 'daily':
      nextDate = getDateByDays(startDate, 0)
      return nextDate
    case 'weekly':
      nextDate = getDateByDays(startDate, 6)
      return nextDate
    case 'fortnightly':
      nextDate = getDateByDays(startDate, 13)
      return nextDate
    case 'monthly':
      startDate = getDateByMonths(startDate, 1)
      return startDate
    case 'fortmonthly':
      startDate = getDateByMonths(startDate, 2)
      return startDate
    case 'quarterly':
      startDate = getDateByMonths(startDate, 4)
      return startDate
    case 'bi-annually':
      startDate = getDateByMonths(startDate, 6)
      return startDate
    case 'annually':
      startDate = getDateByMonths(startDate, 12)
      return startDate
    default:
      return 'Error getting next date.'
  }
}

function getDateByDays(startDate: string, days: number): string {
  const { [0]: year, [1]: month, [2]: day } = startDate.split('-')
  const nextDay = Number(day) + days
  const finalDay = new Date(Number(year), Number(month), 0).getDate()

  if (nextDay > finalDay) {
    const remainder = nextDay - finalDay
    const updatedMonth = Number(month) + 1 > 12 ? 1 : month + 1
    const updatedYear = updatedMonth === 1 ? year + 1 : year
    const date = `${updatedYear}-${updatedMonth.toString().padStart(2, '0')}-${remainder.toString().padStart(2, '0')}`
    return date
  } else {
    const date = `${year}-${month}-${nextDay.toString().padStart(2, '0')}`
    return date
  }
}

function getDateByMonths(startDate: string, months: number): string {
  const { [0]: year, [1]: month, [2]: day } = startDate.split('-')

  let nextMonth = Number(month) + months
  let nextYear = Number(year)
  if (nextMonth > 12) {
    nextMonth = Number(month) + months - 12
    nextYear = Number(year) + 1
  }

  const thisFinalDay = new Date(Number(year), Number(month), 0).getDate()
  const nextFinalDay = new Date(Number(year), Number(nextMonth), 0).getDate()

  if (Number(day) > nextFinalDay) {
    const date = `${nextYear}-${nextMonth.toString().padStart(2, '0')}-${(nextFinalDay - 1).toString().padStart(2, '0')}`
    return date
  } else {
    if (day === '01') {
      const date = `${nextYear}-${nextMonth}-${thisFinalDay.toString().padStart(2, '0')}`
      return date
    } else {
      const date = `${nextYear}-${nextMonth.toString().padStart(2, '0')}-${(
        Number(day) - 1
      )
        .toString()
        .padStart(2, '0')}`
      return date
    }
  }
}

// =================================================================================================================

// JAVASCRIPT DATES are worthless, and I hate them. It's better to handle it all manually, because it's such a
// joke how poorly they are handled.

// This is to change the months that the user is viewing (the buttons, maybe can just recycle the below checks)
// export function changeDatesByMonth(dateRange: DateRange2) {
// }

// This is to get all the needed dates to add to the database (specifically for the add recurring finance form)
// export function getDatesToAdd(dateRange: DateRange2) {
// }

interface DateRange2 {
  startDate: Date
  endDate: Date
}

export function getDatesByCycling(
  dateRange: DateRange2,
  frequency: string,
  direction: string,
): DateRange2 {
  const amount = direction === 'forward' ? 1 : -1
  console.log('cycling:', dateRange.startDate, dateRange.endDate)
  // THIS DOESN'T WORK FOR SOME REASON
  // Get start date:
  const startDate = getNextDateByMonths(dateRange.startDate, amount)
  // Get end date:
  let endDate = getNextDateByMonths(dateRange.endDate, amount)

  if (frequency === 'monthly') {
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0)
  }

  console.log('cycling:', startDate, endDate)

  return { startDate: startDate, endDate: endDate }
}

export function getMultipleDatesByDays(
  dateRange: DateRange2,
  frequency: number,
): Date[] {
  // Setup array to hold dates
  let currentDate = dateRange.startDate
  const dateArray = [new Date(dateRange.endDate)]

  // Check to see if more dates are needed
  while (currentDate < dateRange.endDate) {
    const nextDate = getNextDateByDays(
      dateArray[dateArray.length - 1],
      frequency,
    )
    dateArray.push(nextDate)

    currentDate = nextDate
  }

  // Check if there's been overlap
  if (dateArray[dateArray.length - 1] > dateRange.endDate) {
    dateArray.pop()
  }

  return dateArray
}

export function getMultipleDatesByMonths(
  dateRange: DateRange2,
  frequency: number,
): Date[] {
  // Setup array to hold dates
  let currentDate = dateRange.startDate
  const dateArray = [new Date(dateRange.startDate)]

  // Check to see if more dates are needed
  while (currentDate < dateRange.endDate) {
    // Get next date with function
    const nextDate = getNextDateByMonths(
      dateArray[dateArray.length - 1],
      frequency,
    )

    const matchedDays = new Date(
      nextDate.getFullYear(),
      nextDate.getMonth(),
      dateRange.startDate.getDate(),
    )
    // Check if last day is
    if (matchedDays.getMonth() === nextDate.getMonth()) {
      dateArray.push(matchedDays)
    } else {
      dateArray.push(nextDate)
    }

    currentDate = nextDate
  }

  // Check if there's been overlap
  if (dateArray[dateArray.length - 1] > dateRange.endDate) {
    dateArray.pop()
  }

  return dateArray
}

export function getNextDateByDays(startDate: Date, amount: number): Date {
  const newDate = startDate.setDate(startDate.getDate() + amount)
  return new Date(newDate)
}

export function getNextDateByMonths(startDate: Date, amount: number): Date {
  // Set individual values
  const dd = startDate.getDate()
  const mm = startDate.getMonth() + amount
  const yyyy = startDate.getFullYear()

  const newDate = new Date(yyyy, mm, dd)
  // Check for overflow into next month
  // if (newDate.getMonth() !== mm) {
  //   return new Date(yyyy, mm, 0)
  // }
  return newDate
}

export function getNextDateByYears(startDate: Date, amount: number): Date {
  const newDate = startDate.setDate(startDate.getFullYear() + amount)
  return new Date(newDate)
}
