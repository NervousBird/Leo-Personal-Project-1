import { useExpenses } from "../hooks/useExpenses"
import { useState, useEffect } from "react"
import { Expense } from "../../models/expenses"
import ExpenseRow from "./ExpenseRow"
import { Transaction } from "../../models/transactions"

interface Props {
  expenses: Expense[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
}

function ExpenseComponent({ expenses, transactions, dates }: Props) {
  const useExpense = useExpenses()
  const [hidden, setHidden] = useState(false)
  const [filteredExpenses, setFilteredExpenses] = useState(expenses)
  const [searchString, setSearchString] = useState({ search: "" })

  const handleNewExpense = async () => {
    try {
      await useExpense.add.mutateAsync({
        name: '',
        type: '',
        frequency: `weekly`,
        date: `${dates.startDate}`,
        expected: '0.00',
        notes: '',
      })
    } catch (error) {
      console.error('Error adding income:', error)
    }
  }
  
  const handleRemoveExpense = async (id: Expense) => {
    await useExpense.delete.mutateAsync(id)
  }

  const isDateBetween = (dateToCheck: string, startDate: string, endDate: string) => {
    const result = new Date(dateToCheck) >= new Date(startDate) && new Date(dateToCheck) <= new Date(endDate)
    return result
  }

  const handleHidden = () => {
    setHidden(!hidden)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchString((prev) => ({...prev, [name]: value}))
  }

  const filterExpense= () => {
    let filter = expenses.filter(expense => isDateBetween(expense.date, dates.startDate, dates.endDate))
    if(searchString.search !== "") {
      filter = filter.filter(expense => expense.name.toLowerCase().includes(searchString.search.toLowerCase()))
    }
    setFilteredExpenses(filter)
  }

  useEffect(() => {
    filterExpense()
  }, [expenses, dates, searchString])


  return (
    <section className="expense-component">
      <div className="topbar">
        <button className="title" onClick={handleHidden}>
          <h3>Expenses</h3>
          {hidden  && <i className="bi bi-caret-up-fill" />}
          {!hidden  && <i className="bi bi-caret-down-fill" />}
        </button>
        <div className="search">
          <label htmlFor="search">Search:</label>
          <input type="text" name="search" value={searchString.search} onChange={handleChange} />
        </div>
      </div>

      <span className='table-header'>
        <h4 className='name'>Name</h4>
        <h4 className='type'>Type</h4>
        <h4 className='frequency'>Frequency</h4>
        <h4 className='date'>Date</h4>
        <h4 className='expected'>Expected</h4>
        <h4 className='actual'>Actual</h4>
        <h4 className='difference'>Difference</h4>
        <h4 className='notes'>Notes</h4>
      </span>

      {filteredExpenses && filteredExpenses.map(expense => 
        <div key={expense.id} className={hidden === true ? 'expense-row hidden' : 'expense-row'}>
          <ExpenseRow expenses={expense} transactions={transactions} />
          <button onClick={() => handleRemoveExpense(expense)}>X</button>
        </div>
      )}
      <button onClick={handleNewExpense}>+</button>
    </section>
  )
}

export default ExpenseComponent
