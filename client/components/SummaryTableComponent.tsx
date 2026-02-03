import { useEffect, useState } from 'react'
import { Income } from '../../models/incomes'
import { Expense } from '../../models/expenses'
import { Savings, Saving } from '../../models/savings.ts'
import { Transaction } from '../../models/transactions'
import { reduceByActual, reduceByType, minusCurrency } from '../util/calculation-utils'

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
  hidden: boolean
}

function SummaryTableComponent({ incomes, expenses, savings, saving, transactions, dates, hidden }: Props) {
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

    setIncomeInfo({ expected: reduceByType(incomes, dates, 'expected'), actual: reduceByActual(incomes, transactions, dates) })
    setExpenseInfo({ expected: reduceByType(expenses, dates, 'expected'), actual: reduceByActual(expenses, transactions, dates) })
    setYearlyIncomeInfo({ expected: reduceByType(incomes, currentYear, 'expected'), actual: reduceByActual(incomes, transactions, currentYear) })
    setYearlyExpenseInfo({ expected: reduceByType(expenses, currentYear, 'expected'), actual: reduceByActual(expenses, transactions, currentYear) })
  }, [dates, incomes, expenses, savings, saving, transactions])

  useEffect(() => {
    setIncomeDifference(minusCurrency(incomeInfo.actual, incomeInfo.expected))
    setExpenseDifference(minusCurrency(expenseInfo.expected, expenseInfo.actual))
    setYearlyIncomeDifference(minusCurrency(yearlyIncomeInfo.actual, yearlyIncomeInfo.expected))
    setYearlyExpenseDifference(minusCurrency(yearlyExpenseInfo.expected, yearlyExpenseInfo.actual))
  }, [incomeInfo, expenseInfo, yearlyExpenseInfo, yearlyIncomeInfo])

  return (
    <section className={`summary-items ${hidden === true ? 'hidden' : ''}`}>

      <div className="summary-container">
        <div className="summary-title-income">
          <h3>Incomes</h3>
          <h3>Yearly</h3>
          <h3>Monthly</h3>
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
        </div>

        <div className="summary-title-expense">
          <h3>Expenses</h3>
          <h3>Yearly</h3>
          <h3>Monthly</h3>
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
        </div>

        <div className="summary-title-total">
          <h3></h3>
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
  )
}

export default SummaryTableComponent
