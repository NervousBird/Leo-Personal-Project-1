import { useEffect, useState } from 'react'
import { Income } from '../../models/incomes'
import { Expense } from '../../models/expenses'
import { Savings, Saving } from '../../models/savings.ts'
import { Transaction } from '../../models/transactions'
import SummaryTableColumn from '../components/SummaryTableColumn.tsx'
import { reduceByActual, reduceByType, minusCurrency, addCurrency, reduceSavingsByActual,  reduceSavingsByType } from '../util/calculation-utils'

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
  const [totals, setTotals] = useState({
    yearly: "",
    monthly: "",
    difference: ""
  })
  const [incomeInfo, setIncomeInfo] = useState({
    expected: reduceByType(incomes, dates, 'expected'),
    actual: reduceByActual(incomes, transactions, dates)
  })
  const [yearlyIncomeInfo, setYearlyIncomeInfo] = useState({
    expected: reduceByType(incomes, {
      startDate: `${new Date(dates.startDate).getFullYear()}-01-01`,
      endDate: `${new Date(dates.startDate).getFullYear()}-12-31` },
      'expected'),
    actual: reduceByActual(incomes, transactions, {
      startDate: `${new Date(dates.startDate).getFullYear()}-01-01`,
      endDate: `${new Date(dates.startDate).getFullYear()}-12-31` })
  })
  const [expenseInfo, setExpenseInfo] = useState({
    expected: '0.00',
    actual: '0.00'
  })
  const [yearlyExpenseInfo, setYearlyExpenseInfo] = useState({
    expected: '0.00',
    actual: '0.00'
  })
  const [incomeDifference, setIncomeDifference] = useState<string>('0.00')
  const [yearlyIncomeDifference, setYearlyIncomeDifference] = useState<string>('0.00')
  const [expenseDifference, setExpenseDifference] = useState<string>('0.00')
  const [yearlyExpenseDifference, setYearlyExpenseDifference] = useState<string>('0.00')

  useEffect(() => {
    const currentYear = {
      startDate: `${new Date(dates.startDate).getFullYear()}-01-01`,
      endDate: `${new Date(dates.startDate).getFullYear()}-12-31`
    }

    setIncomeInfo({
      expected: reduceByType(incomes, dates, 'expected'),
      actual: reduceByActual(incomes, transactions, dates)
    })
    setYearlyIncomeInfo({
      expected: reduceByType(incomes, currentYear, 'expected'),
      actual: reduceByActual(incomes, transactions, currentYear)
    })
    setExpenseInfo({
      expected: addCurrency(reduceByType(expenses, dates, 'expected'), reduceSavingsByType(savings, dates, 'amount')),
      actual: addCurrency(reduceByActual(expenses, transactions, dates), reduceSavingsByActual(savings, transactions, dates))
    })
    setYearlyExpenseInfo({
      expected: addCurrency(reduceByType(expenses, currentYear, 'expected'), reduceSavingsByType(savings, currentYear, 'amount')),
      actual: addCurrency(reduceByActual(expenses, transactions, currentYear), reduceSavingsByActual(savings, transactions, currentYear))
    })
    setIncomeDifference(minusCurrency(reduceByActual(incomes, transactions, dates), reduceByType(incomes, dates, 'expected')))
    setYearlyIncomeDifference(minusCurrency(reduceByActual(incomes, transactions, currentYear), reduceByType(incomes, currentYear, 'expected')))
    setExpenseDifference(minusCurrency(addCurrency(reduceByType(expenses, dates, 'expected'), reduceSavingsByType(savings, dates, 'amount')), addCurrency(reduceByActual(expenses, transactions, dates), reduceSavingsByActual(savings, transactions, dates))))
    setYearlyExpenseDifference(minusCurrency(addCurrency(reduceByType(expenses, currentYear, 'expected'), reduceSavingsByType(savings, currentYear, 'amount')) , addCurrency(reduceByActual(expenses, transactions, currentYear), reduceSavingsByActual(savings, transactions, currentYear))))

    setTotals({
    yearly: minusCurrency(
        reduceByActual(incomes, transactions, currentYear),
        addCurrency(reduceByActual(expenses, transactions, currentYear), reduceSavingsByActual(savings, transactions, currentYear))
      ),
    monthly: minusCurrency(
        reduceByActual(incomes, transactions, dates),
        addCurrency(reduceByActual(expenses, transactions, dates), reduceSavingsByActual(savings, transactions, dates))
      ),
    difference: minusCurrency(
        minusCurrency(reduceByActual(incomes, transactions, currentYear), reduceByType(incomes, currentYear, 'expected')),
        minusCurrency(
          addCurrency(reduceByType(expenses, currentYear, 'expected'), reduceSavingsByType(savings, currentYear, 'amount')),
          addCurrency(reduceByActual(expenses, transactions, currentYear), reduceSavingsByActual(savings, transactions, currentYear)))
      ),
    })
  }, [dates, incomes, expenses, savings, saving, transactions])

  return (
    <section className={`summary-items ${hidden === true ? 'hidden' : ''}`}>

      <div className="summary-container">
        <div className="summary-title-income">
          <h3>Incomes</h3>
          <h3>Yearly</h3>
          <h3>Monthly</h3>
        </div>
        <SummaryTableColumn
          yearlyInfo={yearlyIncomeInfo}
          yearlyDifference={yearlyIncomeDifference}
          info={incomeInfo}
          difference={incomeDifference}
        />
        <div className="summary-title-expense">
          <h3>Expenses</h3>
          <h3>Yearly</h3>
          <h3>Monthly</h3>
        </div>
        <SummaryTableColumn
          yearlyInfo={yearlyExpenseInfo}
          yearlyDifference={yearlyExpenseDifference}
          info={expenseInfo}
          difference={expenseDifference}
        />
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
            <p style={Number(totals.yearly) >= 0 ? { color: 'green' } : { color: 'red' }}>
              {`$${totals.yearly}`}
            </p>
          </div>
          <div className="table">
            <p style={Number(totals.monthly) >= 0 ? { color: 'green' } : { color: 'red' }}>
              {`$${totals.monthly}`}
            </p>
          </div>
          <div className="table">
            <p style={Number(totals.difference) >= 0 ? { color: 'green' } : { color: 'red' }}>
              {`$${totals.difference}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SummaryTableComponent
