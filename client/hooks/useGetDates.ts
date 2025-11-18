interface DateRange {
  startDate: string
  endDate: string
}

export function useDateFunctions() {
  return {
    getDates: useGetDates(direction, dateRange, type),
  }
}

export function useGetDates(
  direction: string, // going forward a month or back a month
  dateRange: DateRange, // the current displayed months
  type: string, // always first and last day of month, or specific dates within the month
) {
  let newDates = { startDate: '', endDate: '' }
  // const dates = {
  //   startDate: new Date(dateRange.startDate),
  //   endDate: new Date(dateRange.endDate),
  // }

  if (type === 'monthly') {
    Object.keys(dateRange).forEach((date: string) => {
      const dateSplit = dateRange[date].split('-')
      let month
      const year = dateSplit[0]
      if (direction === 'back') {
        month =
          dateSplit[1] === '01'
            ? '12'
            : (Number(dateSplit[1]) - 1).toString().padStart(2, '0')
      } else {
        month =
          dateSplit[1] === '12'
            ? '01'
            : (Number(dateSplit[1]) + 1).toString().padStart(2, '0')
      }

      const day =
        date === 'startDate'
          ? '01'
          : new Date(year, Number(month), 0)
              .getDate()
              .toString()
              .padStart(2, '0')
      newDates = { ...newDates, [date]: `${year}-${month}-${day}` }
    })
  } else {
    Object.keys(dateRange).forEach((date: string) => {
      const dateSplit = dateRange[date].split('-')
      let month
      const year = dateSplit[0]
      if (direction === 'back') {
        month =
          dateSplit[1] === '01'
            ? '12'
            : (Number(dateSplit[1]) - 1).toString().padStart(2, '0')
      } else {
        month =
          dateSplit[1] === '12'
            ? '01'
            : (Number(dateSplit[1]) + 1).toString().padStart(2, '0')
      }
      if (month === '02') {
        const day =
          dateSplit[2] > 29
            ? new Date(year, Number(month), 0)
                .getDate()
                .toString()
                .padStart(2, '0')
            : dateSplit[2]
        newDates = { ...newDates, [date]: `${year}-${month}-${day}` }
      } else {
        const day =
          dateSplit[2] === '31'
            ? new Date(year, Number(month), 0)
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

export function useGetMonthAsWord(dateRange: DateRange) {
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
