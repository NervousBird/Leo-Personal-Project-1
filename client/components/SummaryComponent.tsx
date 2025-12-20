import { Income } from '../../models/incomes'
import { Expense } from '../../models/expenses'
import { useEffect, useState } from 'react'
import { Transaction } from '../../models/transactions'
import TargetComponent from '../components/TargetComponent.tsx'
import { reduceByActual, reduceByType } from '../util/calculation-utils'
import { getMonthAsWord } from '../util/date-utils'

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

  const [targets, setTargets] = useState({ monthly: '0.00', yearly: '0.00' })

  const [yearlyIncomeExpected, setYearlyIncomeExpected] = useState<string>()
  const [yearlyIncomeActual, setYearlyIncomeActual] = useState<string>()
  const [yearlyIncomeDifference, setYearlyIncomeDifference] = useState<string>()

  const [yearlyExpenseExpected, setYearlyExpenseExpected] = useState<string>()
  const [yearlyExpenseActual, setYearlyExpenseActual] = useState<string>()
  const [yearlyExpenseDifference, setYearlyExpenseDifference] = useState<string>()

  const [incomeExpected, setIncomeExpected] = useState<string>()
  const [incomeActual, setIncomeActual] = useState<string>()
  const [incomeDifference, setIncomeDifference] = useState<string>()

  const [expenseExpected, setExpenseExpected] = useState<string>()  
  const [expenseActual, setExpenseActual] = useState<string>()
  const [expenseDifference, setExpenseDifference] = useState<string>()

  // Load basic informations
  useEffect(() => {
    setIncomeExpected(reduceByType(incomes, dates, 'expected'))
    setIncomeActual(reduceByActual(incomes, transactions, dates))

    setExpenseExpected(reduceByType(expenses, dates, 'expected'))
    setExpenseActual(reduceByActual(expenses, transactions, dates))

    setYearlyIncomeExpected((reduceByType(incomes, { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date().getFullYear()}-12-31` }, 'expected')))
    setYearlyIncomeActual(reduceByActual(incomes, transactions, { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date(dates.startDate).getFullYear()}-12-31` }))
    setYearlyExpenseExpected(reduceByType(expenses, { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date().getFullYear()}-12-31` }, 'expected'))
    setYearlyExpenseActual(reduceByActual(expenses, transactions, { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date(dates.startDate).getFullYear()}-12-31` }))

    setDate(`${new Date(dates.startDate).getFullYear()}-01-01 - ${new Date(dates.startDate).getFullYear()}-12-31`)

  }, [dates, incomes, expenses, transactions])

  // Update the difference
  useEffect(() => {
    setIncomeDifference((Number(incomeActual) - Number(incomeExpected)).toFixed(2))
    setExpenseDifference((Number(expenseExpected) - Number(expenseActual)).toFixed(2))

    setYearlyIncomeDifference((Number(yearlyIncomeActual) - Number(yearlyIncomeExpected)).toFixed(2))
    setYearlyExpenseDifference((Number(yearlyExpenseExpected) - Number(yearlyExpenseActual)).toFixed(2))

  }, [expenseActual, expenseExpected, incomeActual, incomeExpected, yearlyExpenseActual, yearlyExpenseExpected, yearlyIncomeActual, yearlyIncomeExpected])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { monthly, yearly} = e.target
    setTargets({monthly: monthly.value, yearly: yearly.value})
  }

  const handleHidden = () => {
    setHidden(!hidden)
  }

  return (
    <section className="summary">
      <button
        className="titles"
        onClick={handleHidden}
      >
        <h3>{getMonthAsWord(dates)[0]}</h3>
        {/* {incomes} */}
        <p>{date}</p>
      </button>

      <section className={`summary-items ${hidden === false? "hidden" : ""}`}>
        <TargetComponent onHandleSubmit={handleSubmit} />

        <div className="summary-container">
          <div className="summary-title">
            <h3>Type</h3>
            <h3>Yearly</h3>
            <h3>Month</h3>
            <h3>Target</h3>
          </div>

          <div className="summary-table">
            <div className="table">
              <h4>Expected</h4>
              <h4>Actual</h4>
              <h4>Difference</h4>
            </div>
            <div className="table">
              <p>{`$${yearlyIncomeExpected}`}</p>
              <p>{`$${yearlyIncomeActual}`}</p>
              <p style={(Number(yearlyIncomeDifference)) >= 0 ? { color: 'green'} : { color: 'red'}}>
                {`$${yearlyIncomeDifference}`}
              </p>
            </div>
            <div className="table">
              <p>{`$${incomeExpected}`}</p>
              <p>{`$${incomeActual}`}</p>
              {incomeDifference && <section >
                <p style={Number(incomeDifference) >= 0 ? {color: 'green'} : {color: 'red'}}>
                  {`$${incomeDifference}`}
                </p>
              </section>}
            </div>
            <div className="table">
              <p>
                {`$${Number(targets.monthly).toFixed(2)}`}
              </p>
              <p>
                {`$${(Number(incomeActual) - Number(expenseActual)).toFixed(2)}`}
              </p>
              <p style={((Number(incomeActual) - Number(expenseActual)) - Number(targets.monthly)) >= 0 ? {color: 'green'} : {color: 'red'}}>
                {`$${((Number(incomeActual) - Number(expenseActual)) - Number(targets.monthly)).toFixed(2)}`}
              </p>
            </div>
          </div>

          <div className="summary-table">
            <div className="table">
              <h4>Expected</h4>
              <h4>Actual</h4>
              <h4>Difference</h4>
            </div>
            <div className="table">
              <p>{`$${yearlyExpenseExpected}`}</p>
              <p>{`$${yearlyExpenseActual}`}</p>
              <p style={(Number(yearlyExpenseDifference)) >= 0 ? {color: 'green'} : {color: 'red'}}>
                {`$${yearlyExpenseDifference}`}
              </p>
            </div>
            <div className="table">
              <p>{`$${expenseExpected}`}</p>
              <p>{`$${expenseActual}`}</p>
              <section >
                <p style={(Number(expenseExpected) - Number(expenseActual)) >= 0 ? {color: 'green'} : {color: 'red'}}>
                  {`$${(Number(expenseActual) - Number(expenseExpected)).toFixed(2)}`}
                </p>
              </section>
            </div>
            <div key={targets.yearly} className="table">
              <p>
                {`$${Number(targets.yearly).toFixed(2)}`}
              </p>
              <p>
                {`$${(Number(yearlyIncomeActual) - Number(yearlyExpenseActual)).toFixed(2)}`}
              </p>
              <p style={((Number(yearlyIncomeActual) - Number(yearlyExpenseActual)) - Number(targets.yearly)) >= 0 ? {color: 'green'} : {color: 'red'}}>
                {`$${((Number(yearlyIncomeActual) - Number(yearlyExpenseActual)) - Number(targets.yearly)).toFixed(2)}`}
              </p>
            </div>
          </div>

          <div className="summary-totals">
            <div className="table">
              <h4>Total</h4>
            </div>
            <div className="table">
              <p style={Number(yearlyIncomeDifference) - Number(yearlyExpenseDifference) >= 0 ? {color: 'green'} : {color: 'red'}}>
                {`$${(Number(yearlyIncomeActual) - Number(yearlyExpenseActual)).toFixed(2)}`}
              </p>
            </div>
            <div className="table">
              <p style={(Number(yearlyIncomeActual) - Number(yearlyIncomeExpected)) >= 0 ? {color: 'green'} : {color: 'red'}}>
                {`$${(Number(incomeActual) - Number(expenseActual)).toFixed(2)}`}
              </p>
            </div>
            <div className="table">
              <p style={Number(yearlyIncomeDifference) - Number(yearlyExpenseDifference) >= 0 ? {color: 'green'} : {color: 'red'}}>
                {`$${(Number(yearlyIncomeDifference) - Number(yearlyExpenseDifference)).toFixed(2)}`}
              </p>
            </div>
          </div>

        </div>
      </section>
    </section>
  )
}

export default SummaryComponent
