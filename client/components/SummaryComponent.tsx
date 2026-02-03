import { useEffect, useState } from 'react'
import { Income } from '../../models/incomes'
import { Expense } from '../../models/expenses'
import { Savings, Saving } from '../../models/savings.ts'
import { Transaction } from '../../models/transactions'
import { getMonthAsWord, isDateBetween } from '../util/date-utils'
import SummaryTableComponent from './SummaryTableComponent.tsx'
import SummarySavingsComponent from './SummarySavingsComponent.tsx'

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

function SummaryComponent({ incomes, expenses, savings, saving, transactions, dates }: Props) {
  const [date, setDate] = useState<string>()
  const [hidden, setHidden] = useState(false)
  const [summaryHidden, setSummaryHidden] = useState(false)
  const [financeHidden, setFinanceHidden] = useState(false)

  const [info, setInfo] = useState({ largestExpense: {} as Expense, largestIncome: {} as Income, largestSaving: {} as Savings })

  useEffect(() => {
    const currentYear = { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date(dates.startDate).getFullYear()}-12-31` }
    setDate(`${currentYear.startDate} - ${currentYear.endDate}`)

    const incomesTillNow = incomes.filter(income => isDateBetween(income.date, currentYear.startDate, currentYear.endDate)).sort((a, b) => Number(b.expected) - Number(a.expected))
    const expensesTillNow = expenses.filter(expense => isDateBetween(expense.date, currentYear.startDate, currentYear.endDate)).sort((a, b) => Number(b.expected) - Number(a.expected))
    const savingsTillNow = savings.filter(saving => isDateBetween(saving.startingDate, currentYear.startDate, currentYear.endDate)).sort((a, b) => Number(b.amount) - Number(a.amount))

    setInfo({ largestExpense: expensesTillNow[0], largestIncome: incomesTillNow[0], largestSaving: savingsTillNow[0]})

  }, [incomes, expenses, savings, saving, transactions, dates])

  return (
    <section className="summary">
      <h2>{getMonthAsWord(dates)[0]}</h2>
      <button className="titles" onClick={() => setHidden(!hidden)}>
        <h3>Summary Table</h3>
        {hidden && <i className="bi bi-caret-up-fill" />}
        {!hidden && <i className="bi bi-caret-down-fill" />}
        <p>{date}</p>
      </button>

      <SummaryTableComponent incomes={incomes} expenses={expenses} savings={savings} saving={saving} transactions={transactions} dates={dates} hidden={hidden} />

      <section className="summary-summaries-table">
        <h3>Targets</h3>
        <button className="titles" onClick={() => setSummaryHidden(!summaryHidden)}>
          {summaryHidden && <i className="bi bi-caret-up-fill" />}
          {!summaryHidden && <i className="bi bi-caret-down-fill" />}
          <p>{date}</p>
        </button>

        <SummarySavingsComponent savings={savings} saving={saving} transactions={transactions} dates={dates} summaryHidden={summaryHidden} />

      </section>

      <section className="summary-finances-table">
        <h3>Finance  Summaries</h3>
        <button className="titles" onClick={() => setFinanceHidden(!financeHidden)}>
          {financeHidden && <i className="bi bi-caret-up-fill" />}
          {!financeHidden && <i className="bi bi-caret-down-fill" />}
          <p>{date}</p>
        </button>

          <div className={financeHidden ? "finances-summary-container hidden" : "finances-summary-container"}>
            <div className="summary-goals-groups">
              <div className="summary-goal-group">
                <p>Largest income for month/year</p>
                {info.largestIncome && <p>{info.largestIncome.name}: ${info.largestIncome.expected}</p>}
              </div>
              <div className="summary-goal-group">
                <p>Largest expense for the month/year</p>
                {info.largestExpense && <p>{info.largestExpense.name}: ${info.largestExpense.expected}</p>}
              </div>
              <div className="summary-goal-group">
                <p>Largest saving for month/year</p>
                {info.largestSaving && <p>{info.largestSaving.name}: ${info.largestSaving.amount}</p>}
              </div>
              <p>Pie chart for spending (based on expense type and saving name)</p>
            </div>
          </div>
      </section>
    </section>
  )
}

export default SummaryComponent
