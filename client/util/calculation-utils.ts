import { Expense } from '../../models/expenses'
import { Income } from '../../models/incomes'
import { Transaction } from '../../models/transactions'
import { getNextDate, isDateBetween } from './date-utils'

// Return single sum of expected between desired dates
export function reduceByType(
  array: Income[] | Expense[] | Transaction[],
  dates: { startDate: string; endDate: string },
  type: string,
): string {
  if (
    array.filter(
      (object) =>
        new Date(object.date) >= new Date(dates.startDate) &&
        new Date(object.date) <= new Date(dates.endDate),
    ).length !== 0
  ) {
    const total = array
      .filter(
        (object) =>
          new Date(object.date) >= new Date(dates.startDate) &&
          new Date(object.date) <= new Date(dates.endDate),
      )
      .map(
        (object: Income | Expense | Transaction) =>
          object[type as keyof typeof object],
      )
      .reduce((a, b) => `${(Number(a) + Number(b)).toFixed(2)}`)
    return total as string
  }
  return '0.00'
}

// Return single sum of the actual amounts between desired dates (calculated based on transactions, or by expected if no relevant transactions exist)
export function reduceByActual(
  array: Income[] | Expense[],
  transactions: Transaction[],
  dates: { startDate: string; endDate: string },
): string {
  const filteredByDates = array
    .filter(
      (object) =>
        new Date(object.date) >= new Date(dates.startDate) &&
        new Date(object.date) <= new Date(dates.endDate),
    )
    .map((object) => {
      if (transactions) {
        // filter transactions to be between the displayed dates
        const startDate = object.date
        const endDate = getNextDate(startDate, object.frequency)
        const amounts = transactions
          .filter(
            (transaction) =>
              transaction.type === object.type &&
              isDateBetween(transaction.date, startDate, endDate),
          )
          .map((transaction) => transaction.amount)

        if (amounts.length !== 0) {
          const count = amounts.reduce(
            (acc, curr) => `${Number(acc) + Number(curr)}`,
          )
          return Number(count).toFixed(2)
        } else {
          return object.expected
        }
      }
      return object.expected
    })
  if (filteredByDates.length !== 0) {
    const total = filteredByDates.reduce(
      (a, b) => `${(Number(a) + Number(b)).toFixed(2)}`,
    )
    return `${total}`
  }
  return '0.00'
}

export function minusCurrency(a: string, b: string):number {
  const result = (Number(a) - Number(b)).toFixed(2)
  return result
}

export function changeHexColor(colour: string, amount: number): string {
  const hexcode = colour.replace(/^#/, '')

  let r = parseInt(hexcode.substring(0,2), 16)
  let g = parseInt(hexcode.substring(2,4), 16)
  let b = parseInt(hexcode.substring(4,6), 16)

  r = r + amount
  g = g + amount
  b = b + amount

  r = (r > 255) ? 255 : r
  g = (g > 255) ? 255 : g
  b = (b > 255) ? 255 : b

  r = (r < 0) ? 0 : r
  g = (g < 0) ? 0 : g
  b = (b < 0) ? 0 : b

  r = ((r.toString(16).length==1)?"0"+r.toString(16):r.toString(16))
  g = ((g.toString(16).length==1)?"0"+g.toString(16):g.toString(16))
  b = ((b.toString(16).length==1)?"0"+b.toString(16):b.toString(16))

  console.log(`#${r}${g}${b}`)

  return `#${r}${g}${b}`
}
