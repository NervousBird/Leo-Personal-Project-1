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
    })
  if (filteredByDates.length !== 0) {
    const total = filteredByDates.reduce(
      (a, b) => `${(Number(a) + Number(b)).toFixed(2)}`,
    )
    return `${total}`
  }
  return '0.00'
}
