import { useEffect, useState } from 'react'
import { Income } from '../../models/incomes'
import { Expense } from '../../models/expenses'
import { Savings, Saving } from '../../models/savings.ts'
import { Transaction } from '../../models/transactions'
import { getNextDate, isDateBetween } from '../util/date-utils'
import SummaryTableComponent from './SummaryTableComponent.tsx'
import SummarySavingsComponent from './SummarySavingsComponent.tsx'
import SummarySummaries from './SummarySummaries.tsx'

interface Props {
  incomes: Income[]
  expenses: Expense[]
  savings: Savings[]
  saving: Saving[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
}

function SummaryComponent({
  incomes,
  expenses,
  savings,
  saving,
  transactions,
  dates,
}: Props) {
  const [hidden, setHidden] = useState(false)

  const [info, setInfo] = useState({
    largestIncome: {
      nameMonth: '',
      expectedMonth: '',
      nameYear: '',
      expectedYear: '',
    },
    largestExpense: {
      nameMonth: '',
      expectedMonth: '',
      nameYear: '',
      expectedYear: '',
    },
    largestSaving: {
      nameMonth: '',
      expectedMonth: '',
      nameYear: '',
      expectedYear: '',
    },
  })

  const countActualAmount = (
    data: Income | Expense,
    transaction: Transaction[],
  ): string[] => {
    const startDate = data.date
    const endDate = getNextDate(startDate, data.frequency)
    const amounts = transactions
      .filter(
        (transaction) =>
          transaction.type === data.type &&
          isDateBetween(transaction.date, startDate, endDate),
      )
      .map((transaction) => transaction.amount)

    if (amounts.length !== 0) {
      const count = amounts.reduce(
        (acc, curr) => `${Number(acc) + Number(curr)}`,
      )
      return [data.name, Number(count).toFixed(2), data.date]
    }
    return [data.name, data.expected, data.date]
  }

  useEffect(() => {
    const currentYear = {
      startDate: `${new Date(dates.startDate).getFullYear()}-01-01`,
      endDate: `${new Date(dates.startDate).getFullYear()}-12-31`,
    }
    // find the highest income
    let incomesMonth = [] as string[][]
    const incomesYear = [] as string[][]
    const incomesTillNow = [
      ...incomes
        .filter((income) =>
          isDateBetween(
            income.date,
            currentYear.startDate,
            currentYear.endDate,
          ),
        )
        .sort((a, b) => Number(b.expected) - Number(a.expected)),
    ]
    incomesTillNow.forEach((income) => {
      incomesMonth.push(countActualAmount(income, transactions))
      incomesYear.push(countActualAmount(income, transactions))
    })
    incomesMonth = incomesMonth
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .filter((income) =>
        isDateBetween(income[2], dates.startDate, dates.endDate),
      )
    incomesYear.sort((a, b) => Number(b[1]) - Number(a[1]))

    // find the highest expense
    let expensesMonth = [] as string[][]
    const expensesYear = [] as string[][]
    const expensesTillNow = [
      ...expenses
        .filter((expense) =>
          isDateBetween(
            expense.date,
            currentYear.startDate,
            currentYear.endDate,
          ),
        )
        .sort((a, b) => Number(b.expected) - Number(a.expected)),
    ]
    expensesTillNow.forEach((expense) => {
      expensesMonth.push(countActualAmount(expense, transactions))
      expensesYear.push(countActualAmount(expense, transactions))
    })
    expensesMonth = expensesMonth
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .filter((expense) =>
        isDateBetween(expense[2], dates.startDate, dates.endDate),
      )
    expensesYear.sort((a, b) => Number(b[1]) - Number(a[1]))

    // find the highest saving
    let savingsMonth = [] as string[][]
    const savingsYear = [] as string[][]
    const savingsTillNow = [
      ...savings
        .filter((saving) =>
          isDateBetween(
            saving.startingDate,
            currentYear.startDate,
            currentYear.endDate,
          ),
        )
        .sort((a, b) => Number(b.amount) - Number(a.amount)),
    ]
    savingsTillNow.forEach((saving) => {
      savingsMonth.push(
        countActualAmount(
          {
            id: saving.id,
            name: saving.name,
            type: saving.name,
            frequency: saving.frequency,
            date: saving.startingDate,
            expected: saving.amount,
            notes: saving.notes,
          },
          transactions,
        ),
      )
      savingsYear.push(
        countActualAmount(
          {
            id: saving.id,
            name: saving.name,
            type: saving.name,
            frequency: saving.frequency,
            date: saving.startingDate,
            expected: saving.amount,
            notes: saving.notes,
          },
          transactions,
        ),
      )
    })
    savingsMonth = savingsMonth
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .filter((saving) =>
        isDateBetween(saving[2], dates.startDate, dates.endDate),
      )
    savingsYear.sort((a, b) => Number(b[1]) - Number(a[1]))
    // find highest for the month, then for the entire year

    setInfo({
      largestIncome: {
        nameMonth: incomesMonth[0][0],
        expectedMonth: incomesMonth[0][1],
        nameYear: incomesYear[0][0],
        expectedYear: incomesYear[0][1],
      },
      largestExpense: {
        nameMonth: expensesMonth[0][0],
        expectedMonth: expensesMonth[0][1],
        nameYear: expensesYear[0][0],
        expectedYear: expensesYear[0][1],
      },
      largestSaving: {
        nameMonth: savingsMonth[0][0],
        expectedMonth: savingsMonth[0][1],
        nameYear: savingsYear[0][0],
        expectedYear: savingsYear[0][1],
      },
    })
  }, [incomes, expenses, savings, saving, transactions, dates])

  return (
    <section className="summary">
      <button className="titles" onClick={() => setHidden(!hidden)}>
        <h3>Summary Table</h3>
        {hidden && <i className="bi bi-caret-up-fill" />}
        {!hidden && <i className="bi bi-caret-down-fill" />}
      </button>
      <SummaryTableComponent
        incomes={incomes}
        expenses={expenses}
        savings={savings}
        saving={saving}
        transactions={transactions}
        dates={dates}
        hidden={hidden}
      />

      <SummarySavingsComponent
        savings={savings}
        saving={saving}
        transactions={transactions}
        dates={dates}
      />
      <SummarySummaries info={info} />
    </section>
  )
}

export default SummaryComponent
