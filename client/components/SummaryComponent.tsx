import { FormEvent, useEffect, useState, ChangeEvent } from 'react'
import { Income } from '../../models/incomes'
import { Expense } from '../../models/expenses'
import { Savings, Saving } from '../../models/savings.ts'
import { Transaction } from '../../models/transactions'
import TargetComponent from '../components/TargetComponent.tsx'
import { reduceByActual, reduceByType, minusCurrency } from '../util/calculation-utils'
import { getMonthAsWord } from '../util/date-utils'
import { getNextDate, isDateBetween } from "../util/date-utils"
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

  useEffect(() => {
    const currentYear = { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date(dates.startDate).getFullYear()}-12-31` }

    setDate(`${currentYear.startDate} - ${currentYear.endDate}`)
  }, [dates])

  return (
    <section className="summary">
      <h2>Summary and Targets</h2>
      <button className="titles" onClick={() => setHidden(!hidden)}>
        <h3>{getMonthAsWord(dates)[0]}</h3>
        {hidden && <i className="bi bi-caret-up-fill" />}
        {!hidden && <i className="bi bi-caret-down-fill" />}
        <p>{date}</p>
      </button>

      <SummaryTableComponent incomes={incomes} expenses={expenses} savings={savings} saving={saving} transactions={transactions} dates={dates} hidden={hidden} />

      <section className="summary-summaries-table">
        <h3>Summary Table</h3>
        <button className="titles" onClick={() => setSummaryHidden(!summaryHidden)}>
          {summaryHidden && <i className="bi bi-caret-up-fill" />}
          {!summaryHidden && <i className="bi bi-caret-down-fill" />}
          <p>{date}</p>
        </button>

        <SummarySavingsComponent savings={savings} saving={saving} transactions={transactions} dates={dates} summaryHidden={summaryHidden} />

      </section>
    </section>
  )
}

export default SummaryComponent
