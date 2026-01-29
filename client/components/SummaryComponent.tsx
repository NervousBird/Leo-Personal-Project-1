import { Income } from '../../models/incomes'
import { Expense } from '../../models/expenses'
import { FormEvent, useEffect, useState, ChangeEvent } from 'react'
import { Transaction } from '../../models/transactions'
import TargetComponent from '../components/TargetComponent.tsx'
import { reduceByActual, reduceByType, minusCurrency } from '../util/calculation-utils'
import { getMonthAsWord } from '../util/date-utils'
import { getNextDate, isDateBetween } from "../util/date-utils"

interface Props {
  incomes: Income[]
  expenses: Expense[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
}

function SummaryComponent({ incomes, expenses, transactions, dates }: Props) {
  const [date, setDate] = useState<string>()
  const [hidden, setHidden] = useState(false)
  const [summaryHidden, setSummaryHidden] = useState(false)
  const [targets, setTargets] = useState({ monthly: '0.00', yearly: '0.00' })
  const [savings, setSavings] = useState(expenses.filter((expense) => expense.type.toLowerCase() === 'savings').map((expense) => expense.name))
  const [filter, setFilter] = useState("")
  const [actual, setActual] = useState({ monthly: "", yearly: "" })

  const [yearlyIncomeInfo, setYearlyIncomeInfo] = useState({ expected: '0.00', actual: '0.00' })
  const [yearlyIncomeDifference, setYearlyIncomeDifference] = useState<number | string>()

  const [yearlyExpenseInfo, setYearlyExpenseInfo] = useState({ expected: '0.00', actual: '0.00' })
  const [yearlyExpenseDifference, setYearlyExpenseDifference] = useState<number | string>()

  const [incomeInfo, setIncomeInfo] = useState({ expected: '0.00', actual: '0.00' })
  const [incomeDifference, setIncomeDifference] = useState<number | string>()

  const [expenseInfo, setExpenseInfo] = useState({ expected: '0.00', actual: '0.00' })
  const [expenseDifference, setExpenseDifference] = useState<number | string>()

  useEffect(() => {
    const currentYear = { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date(dates.startDate).getFullYear()}-12-31` }
    console.log(currentYear)

    setIncomeInfo({ expected: reduceByType(incomes, dates, 'expected'), actual: reduceByActual(incomes, transactions, dates) })
    setExpenseInfo({ expected: reduceByType(expenses, dates, 'expected'), actual: reduceByActual(expenses, transactions, dates) })
    setYearlyIncomeInfo({ expected: reduceByType(incomes, currentYear, 'expected'), actual: reduceByActual(incomes, transactions, currentYear) })
    setYearlyExpenseInfo({ expected: reduceByType(expenses, currentYear, 'expected'), actual: reduceByActual(expenses, transactions, currentYear) })
    setDate(`${currentYear.startDate} - ${currentYear.endDate}`)
  }, [dates, incomes, expenses, transactions])

  useEffect(() => {
    setIncomeDifference(minusCurrency(incomeInfo.actual, incomeInfo.expected))
    setExpenseDifference(minusCurrency(expenseInfo.expected, expenseInfo.actual))
    setYearlyIncomeDifference(minusCurrency(yearlyIncomeInfo.actual, yearlyIncomeInfo.expected))
    setYearlyExpenseDifference(minusCurrency(yearlyExpenseInfo.expected, yearlyExpenseInfo.actual))
  }, [incomeInfo, expenseInfo, yearlyExpenseInfo, yearlyIncomeInfo])

  const countActualAmount = ( savingType: string, dateRange: { startDate: string, endDate: string } ): string => {
    if (transactions) {
      const startDate = dateRange.startDate
      const endDate = dateRange.endDate
      const amounts = transactions.filter(transaction =>
        transaction.type === savingType &&
        isDateBetween(transaction.date, startDate, endDate))
        .map(transaction => transaction.amount)

      if (amounts.length !== 0) {
        const count = amounts.reduce((acc, curr) => `${Number(acc) + Number(curr)}`)
        return `$${Number(count).toFixed(2)}`
      }
    }
    return `$${reduceByType(expenses.filter((saving) => saving.name === filter), dateRange, 'expected')}`
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const monthly = (formData.get('monthly') as string) || '0.00'
    const yearly = (formData.get('yearly') as string) || '0.00'
    setTargets({ monthly, yearly })
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const currentYear = { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date(dates.startDate).getFullYear()}-12-31` }
    const monthly = countActualAmount(value, dates)
    const yearly = countActualAmount(value, currentYear)
    setSavings(expenses.filter((expense) => expense.type.toLowerCase() === 'savings').map((expense) => expense.name))
    setActual({ monthly: monthly, yearly: yearly})
    setFilter(value)
  }

  return (
    <section className="summary">
      <h2>Summary and Targets</h2>
      <button className="titles" onClick={() => setHidden(!hidden)}>
        <h3>{getMonthAsWord(dates)[0]}</h3>
        {hidden && <i className="bi bi-caret-up-fill" />}
        {!hidden && <i className="bi bi-caret-down-fill" />}
        <p>{date}</p>
      </button>

      <section className={`summary-items ${hidden === true ? 'hidden' : ''}`}>
        {/* <TargetComponent onHandleSubmit={handleSubmit} expenses={expenses} year={dates.startDate} /> */}

        <div className="summary-container">
          <div className="summary-title-income">
            <h3>Incomes</h3>
            <h3>Yearly</h3>
            <h3>Monthly</h3>
            <h3>Monthly Target</h3>
          </div>

          <div className="summary-table">
            <div className="table">
              <h4>Expected</h4>
              <h4>Actual</h4>
              <h4>Difference</h4>
            </div>

            <div className="table">
              <p>{`$${yearlyIncomeInfo.expected}`}</p>
              <p>{`$${yearlyIncomeInfo.actual}`}</p>
              <p style={Number(yearlyIncomeDifference) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {`$${yearlyIncomeDifference}`}
              </p>
            </div>

            <div className="table">
              <p>{`$${incomeInfo.expected}`}</p>
              <p>{`$${incomeInfo.actual}`}</p>
              {incomeDifference && (
                <section>
                  <p style={Number(incomeDifference) >= 0 ? { color: 'green' } : { color: 'red' }}>
                    {`$${incomeDifference}`}
                  </p>
                </section>
              )}
            </div>

            <div className="table">
              <p>{`$${Number(targets.monthly).toFixed(2)}`}</p>
              <p>
                {`$${minusCurrency(incomeInfo.actual, expenseInfo.actual)}`}
              </p>
              <p style={Number(minusCurrency(incomeInfo.actual, expenseInfo.actual)) - Number(targets.monthly) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {`$${minusCurrency(minusCurrency(incomeInfo.actual, expenseInfo.actual), targets.monthly)}`}
              </p>
            </div>
          </div>

          <div className="summary-title-expense">
            <h3>Expenses</h3>
            <h3>Yearly</h3>
            <h3>Monthly</h3>
            <h3>Yearly Target</h3>
          </div>

          <div className="summary-table">
            <div className="table">
              <h4>Expected</h4>
              <h4>Actual</h4>
              <h4>Difference</h4>
            </div>

            <div className="table">
              <p>{`$${yearlyExpenseInfo.expected}`}</p>
              <p>{`$${yearlyExpenseInfo.actual}`}</p>
              <p style={Number(yearlyExpenseDifference) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {`$${yearlyExpenseDifference}`}
              </p>
            </div>

            <div className="table">
              <p>{`$${expenseInfo.expected}`}</p>
              <p>{`$${expenseInfo.actual}`}</p>
              <section>
                <p style={Number(expenseDifference) >= 0 ? { color: 'green' } : { color: 'red' }}>
                  {`$${expenseDifference}`}
                </p>
              </section>
            </div>

            <div key={targets.yearly} className="table">
              <p>{`$${Number(targets.yearly).toFixed(2)}`}</p>
              <p>
                {`$${minusCurrency(yearlyIncomeInfo.actual, yearlyExpenseInfo.actual)}`}
              </p>
              <p style={Number(minusCurrency(yearlyIncomeInfo.actual, yearlyExpenseInfo.actual)) - Number(targets.yearly) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {`$${minusCurrency(minusCurrency(yearlyIncomeInfo.actual, yearlyExpenseInfo.actual), targets.yearly)}`}
              </p>
            </div>
          </div>

          <div className="summary-title-total">
            <h3>Totals</h3>
            <h3>Yearly</h3>
            <h3>Monthly</h3>
            <h3>Difference</h3>
          </div>

          <div className="summary-totals">
            <div className="table">
              <h4>Total</h4>
            </div>
            <div className="table">
              <p style={Number(minusCurrency(yearlyIncomeInfo.actual, yearlyExpenseInfo.actual)) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {`$${minusCurrency(yearlyIncomeInfo.actual, yearlyExpenseInfo.actual)}`}
              </p>
            </div>
            <div className="table">
              <p style={Number(minusCurrency(incomeInfo.actual, expenseInfo.actual)) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {`$${(Number(incomeInfo.actual) - Number(expenseInfo.actual)).toFixed(2)}`}
              </p>
            </div>
            <div className="table">
              <p style={Number(yearlyIncomeDifference) + Number(yearlyExpenseDifference) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {`$${(Number(yearlyIncomeDifference) + Number(yearlyExpenseDifference)).toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="summary-summaries-table">
        <h3>Summary Table</h3>
        <button className="titles" onClick={() => setSummaryHidden(!summaryHidden)}>
          {summaryHidden && <i className="bi bi-caret-up-fill" />}
          {!summaryHidden && <i className="bi bi-caret-down-fill" />}
          <p>{date}</p>
        </button>

        <div className={summaryHidden ? 'summaries-container hidden' : 'summaries-container'}>
          <div className="savings-selection-container">
            <select key={filter} value={filter} onChange={handleChange}>
              {[...new Set(savings)].map((saving, idx) => (
                <option key={idx} value={saving}>{saving}</option>
              ))}
            </select>
          </div>
          <div className="summary-group">
            <p>
              Currently on track for <b>{getMonthAsWord(dates)[0]}</b> to make:
            </p>
            <p key={actual.monthly}>{actual.monthly}</p>
          </div>
          <div className="summary-group">
            <p>
              Currently on track for <b>{dates.startDate.slice(0, 4)}</b> to
              make:
            </p>
            <p key={actual.yearly}>{actual.yearly}</p>
          </div>
        </div>
      </section>
    </section>
  )
}

export default SummaryComponent
