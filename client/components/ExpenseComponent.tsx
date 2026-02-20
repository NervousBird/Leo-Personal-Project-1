import { useExpenses } from "../hooks/useExpenses"
import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from "react"
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
  const [sort, setSort] = useState("")
  const filter = useRef("")

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

  const handleSort = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement
    if(sort === name) {
      setSort("")
      filter.current = ""
    } else {
      setSort(name)
      filter.current = name
    }
  }

  const updateSort = (filter: string) => {
    switch(filter) {
      case "name":
        setFilteredExpenses([...expenses.sort((a, b) => {return a.name.localeCompare(b.name)})])
        break
      case "type":
        setFilteredExpenses([...expenses.sort((a, b) => {return a.type.localeCompare(b.type)})])
        break
      case "frequency":
        setFilteredExpenses([...expenses.sort((a, b) => {return a.frequency.localeCompare(b.frequency)})])
        break
      case "date":
        setFilteredExpenses([...expenses.sort((a, b) => {return (Number(new Date(a.date)) - Number(new Date(b.date)))})])
        break
      case "expected":
        setFilteredExpenses([...expenses.sort((a, b) => {return Number(b.expected) - Number(a.expected)})])
        break
      case "actual":
        setFilteredExpenses([...expenses.sort((a, b) => {return Number(b.expected) - Number(a.expected)})])
        break
      case "difference":
        setFilteredExpenses([...expenses.sort((a, b) => {return Number(b.expected) - Number(a.expected)})])
        break
      case "notes":
        setFilteredExpenses([...expenses.sort((a, b) => {return a.name.localeCompare(b.name)})])
        break
      case "":
        setFilteredExpenses([...expenses])
        break
    }
  }

  useEffect (() => {
    updateSort(filter.current)
  }, [expenses, dates, sort])

  const filterExpense = () => {
    const filter = expenses.filter(expense => expense.name.toLowerCase().includes(searchString.search.toLowerCase()))
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
        <button name="name" className="name" onClick={handleSort}>Name</button>
        <button name="type" className="type" onClick={handleSort}>type</button>
        <button name="frequency" className="frequency" onClick={handleSort}>Frequency</button>
        <button name="date" className="date" onClick={handleSort}>Date</button>
        <button name="expected" className="expected" onClick={handleSort}>Expected</button>
        <button name="actual" className="actual" onClick={handleSort}>Actual</button>
        <button name="difference" className="difference" onClick={handleSort}>Difference</button>
        <button name="notes" className="notes" onClick={handleSort}>Notes</button>
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
