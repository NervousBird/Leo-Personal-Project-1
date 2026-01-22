import { ChangeEvent, useEffect, useState } from "react"
import { Link } from "react-router"
import { changeDatesByMonth, getMonthAsWord, padDate } from "../util/date-utils"
import { useIncomes } from "../hooks/useIncomes"
import { useExpenses } from "../hooks/useExpenses"
import { useTransactions } from "../hooks/useTransactions"
import { useUserData } from "../hooks/useUserData.ts"
import Finances from "./Finances"
import SummaryComponent from "../components/SummaryComponent"
import CustomisationComponent from "../components/CustomisationComponent.tsx"

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
  const { data: userDate, isPending: userDataPending, isError: userDataError } = useUserData()

  const [dateRange, setDateRange] = useState({ startDate: setDate[0], endDate: setDate[1] })
  const [cycleType, setCycleType] = useState('monthly')
  const [dateTitle, setDateTitle] = useState([] as string[])
  const [yearTitle, setYearTitle] = useState([] as string[])

  useEffect(() => {
    updateMonthDisplay()
    updateYearDisplay()
  },[dateRange])

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
      <Link to="/" viewTransition>
        Home
      </Link>

      <CustomisationComponent />

      <header className="year-title">
        <h1>{yearTitle}</h1>
      </header>

      <div className="information-container">

        {incomesPending && <p>Loading Incomes ...</p>}
        {expensesPending && <p>Loading Expenses ...</p>}
        {transactionsPending && <p>Loading Transactions ...</p>}

        {incomesError && <p>Error Loading Incomes ...</p>}
        {expensesError && <p>Error Loading Expenses...</p>}
        {transactionsError && <p>Error Loading Transactions ...</p>}

        {incomes && expenses && transactions &&
          <Finances
            incomes={incomes}
            expenses={expenses}
            transactions={transactions}
            dates={dateRange}
            dateTitle={dateTitle}
            cycleType={cycleType}
            onHandleChange={handleChange}
            onHandleChangeMonth={handleChangeMonth}
            onHandleCycleType={handleCycleType}
          />
        }

        {/* Add nav bar to cycle summary and tables? */}

        {incomes && expenses && transactions &&
          <SummaryComponent incomes={incomes} expenses={expenses} transactions={transactions} dates={dateRange} />
        }
      </div>
    </section>
  )
}

export default Home
