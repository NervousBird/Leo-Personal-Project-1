import { ChangeEvent, useEffect,useMemo, useState } from "react"
import { Link } from "react-router"
import { changeDatesByMonth, getMonthAsWord, padDate, isDateBetween } from "../util/date-utils"
import { useIncomes } from "../hooks/useIncomes"
import { useExpenses } from "../hooks/useExpenses"
import { useTransactions } from "../hooks/useTransactions"
import { useSavings, useSaving } from "../hooks/useSavings.ts"
import { useUserData } from "../hooks/useUserData.ts"
import Finances from "./Finances"
import SummaryComponent from "../components/SummaryComponent"
import CustomisationComponent from "../components/CustomisationComponent.tsx"
import { Income } from "../../models/incomes.ts"
import { Expense } from "../../models/expenses.ts"
import { Savings } from "../../models/savings.ts"
import { Transaction } from "../../models/transactions.ts"

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

const setDate = [
  `${currentYear}-${padDate(currentMonth+1)}-${padDate(new Date(currentYear, currentMonth+1).getDate())}`,
  `${currentYear}-${padDate(currentMonth+1)}-${padDate(new Date(currentYear, currentMonth+1, 0).getDate())}`,
]

function Home() {
  const { data: incomes, isPending: incomesPending, isError: incomesError } = useIncomes()
  const { data: expenses, isPending: expensesPending, isError: expensesError } = useExpenses()
  const { data: transactions, isPending: transactionsPending, isError: transactionsError } = useTransactions()
  const { data: savings, isPending: savingsPending, isError: savingsError } = useSavings()
  const { data: saving, isPending: savingPending, isError: savingError } = useSaving()
  const { data: userData, isPending: userDataPending, isError: userDataError } = useUserData()

  const [dateRange, setDateRange] = useState({ startDate: setDate[0], endDate: setDate[1] })
  const [cycleType, setCycleType] = useState('monthly')
  const [dateTitle, setDateTitle] = useState([] as string[])
  const [yearTitle, setYearTitle] = useState([] as string[])

  const incomesData = useMemo((): Income[] => {
    if(incomes) {
      return incomes.filter(income => isDateBetween(income.date, dateRange.startDate, dateRange.endDate))
    }
    return [] as Income[]
  }, [incomes, dateRange])

  const expensesData = useMemo((): Expense[] => {
    if(expenses) {
      return expenses.filter(expense => isDateBetween(expense.date, dateRange.startDate, dateRange.endDate))
    }
    return [] as Expense[]
  }, [expenses, dateRange])

  const savingsData = useMemo((): Savings[] => {
    if(savings) {
      return savings.filter(saving => isDateBetween(saving.startingDate, dateRange.startDate, dateRange.endDate))
    }
    return [] as Savings[]
  }, [savings, dateRange])

  const transactionsData = useMemo((): Transaction[] => {
    if(transactions) {
      return transactions.filter(transaction => isDateBetween(transaction.date, dateRange.startDate, dateRange.endDate))
    }
    return [] as Transaction[]
  }, [transactions, dateRange])

  useEffect(() => {
    updateMonthDisplay()
    updateYearDisplay()
  },[dateRange, incomes])

  const updateMonthDisplay = () => {
    const newDateTitle = getMonthAsWord(dateRange)
    const removeDuplicates = newDateTitle[0] === newDateTitle[1] ? [newDateTitle[1]] : [newDateTitle[0], '-', newDateTitle[1]]
    setDateTitle(removeDuplicates)
  }

  const updateYearDisplay = () => {
    const newYearTitle = [new Date(dateRange.startDate).getFullYear().toString(), new Date(dateRange.endDate).getFullYear().toString()]
    const removeDuplicates = newYearTitle[0] === newYearTitle[1] ? [newYearTitle[1]] : [newYearTitle[0], '-', newYearTitle[1]]
    setYearTitle(removeDuplicates)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDateRange((prev) => ({...prev, [name]: value}))
  }

  const handleChangeMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name: direction } = e.target as HTMLButtonElement
    const newDates = changeDatesByMonth(direction, dateRange, cycleType)
    setDateRange(newDates)
  }

  const handleCycleType = () => {
    if(cycleType === 'monthly') {
      setCycleType('specific')
    } else {
      setCycleType('monthly')
    }
  }

  return (
    <section>
      <div className="navbar">
        <Link className="home-button" to="/" viewTransition>
          Home
        </Link>

        <header className="year-title">
          <nav className='finance-nav'>
            <button
              value={cycleType}
              onClick={handleCycleType}>
              {cycleType.charAt(0).toUpperCase() + cycleType.slice(1)}
            </button>
            <span>
              <button name='back' onClick={handleChangeMonth}>{'<'}</button>
              <input
                type='date'
                id='startDate'
                name='startDate'
                value={dateRange.startDate}
                onChange={handleChange}
              />
              <input
                type='date'
                id='endDate'
                name='endDate'
                min={dateRange.startDate}
                value={dateRange.endDate}
                onChange={handleChange}
              />
              <button name='forward' onClick={handleChangeMonth}>{'>'}</button>
            </span>
          </nav>
        </header>

        <span className='monthtitle-container'>
          {dateTitle && dateTitle.map((month, idx) => <h3 key={idx}>{month}</h3>)}
          <h3>{yearTitle}</h3>
        </span>
      </div>

      {userDataPending && <p>Loading User Data ...</p>}
      {userDataError && <p>Error Loading User Data ...</p>}

      {userData && <CustomisationComponent data={userData} /> }

      <div className="information-container">

        {incomesPending && <p>Loading Incomes ...</p>}
        {expensesPending && <p>Loading Expenses ...</p>}
        {transactionsPending && <p>Loading Transactions ...</p>}
        {savingsPending && savingPending && <p>Loading Savings...</p>}

        {incomesError && <p>Error Loading Incomes ...</p>}
        {expensesError && <p>Error Loading Expenses...</p>}
        {transactionsError && <p>Error Loading Transactions ...</p>}
        {savingsError && savingError && <p>Error Loading Savings...</p>}

        {incomesData && expenses && transactions && savings && saving &&
          <Finances
            incomes={incomesData}
            expenses={expensesData}
            transactions={transactionsData}
            savings={savingsData}
            dates={dateRange}
          />
        }

        {incomes && expenses && transactions && savings && saving &&
          <SummaryComponent
            incomes={incomes}
            expenses={expenses}
            transactions={transactions}
            savings={savings}
            saving={saving}
            dates={dateRange}
          />
        }
      </div>
    </section>
  )
}

export default Home
