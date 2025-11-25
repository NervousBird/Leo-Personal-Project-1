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

function cycleDatesByYear(dateRange: DateRange): DateRange {
  let newDates = { startDate: '', endDate: '' }
  // Can literally just change the year, no other coding needed
  return newDates
}

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
      datesArray = getDatesByDay(dateRange, 30)
      return datesArray
    case 'fortmonthly':
      datesArray = getDatesByDay(dateRange, 61)
      return datesArray
    case 'quarterly':
      datesArray = getDatesByDay(dateRange, 91)
      return datesArray
    case 'bi-annually':
      datesArray = getDatesByDay(dateRange, 177)
      return datesArray
    case 'annually':
      datesArray = getDatesByDay(dateRange, 365)
      return datesArray
    default:
      return []
  }
}

// Return array of dates between the start date by the number of days
function getDatesByDay(dateRange: DateRange, days: number): string[] {
  const datesArray = [`${dateRange.startDate}`]

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
      const month = currentMonth.toString().padStart(2, '0')
      // BREAK if the month is over 12
      if (Number(month) > 12) {
        break
      }
      datesArray.push(
        // `${nextDay.toString().padStart(2, '0')}-${Number(month)}-${year}`,
        `${year}-${month.padStart(2, '0')}-${nextDay.toString().padStart(2, '0')}`,
      )
    } else {
      datesArray.push(
        `${year}-${month.padStart(2, '0')}-${nextDay.toString().padStart(2, '0')}`,
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

// // Return array of dates between the start date by the number of months
// function getDatesByMonth(dateRange: DateRange, months: number): string[] {
//   const datesArray = []

//   const { [0]: year, [1]: month, [2]: day } = dateRange.startDate.split('-')
//   const endDate = new Date(dateRange.endDate)
//   let currentDate = new Date(dateRange.startDate)
//   let currentMonth = Number(month)
//   let currentDay = Number(day)

//   while (currentDate < endDate) {
//     // get the max amount of days
//     const finalDay = new Date(Number(year), Number(month), 0).getDate()

//     if(nextDay > finalDay) {
//       // Set day to final of the month (then continue with setting it as the original?)
//       datesArray.push(
//         `${}`
//       )
//     }

//     if (Number(month) > 12) {
//       break
//     }

//     currentDate = new Date(
//       datesArray[datesArray.length - 1].split('-').reverse().join('-'),
//     )
//   }

//   return datesArray
// }

// // Return array of dates between the start date by the number of years
// function getDatesByYear(dateRange: DateRange, years: number): string[] {
//   const datesArray = []

//   return datesArray
// }
