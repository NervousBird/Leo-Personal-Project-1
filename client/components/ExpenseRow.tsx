import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Expense } from "../../models/expenses"
import { useExpenses } from "../hooks/useExpenses"
import { useTransactions } from "../hooks/useTransactions"
interface Props {
  startDate: string
  endDate: string
}

function ExpenseRow(expenses: Expense, dates: Props) {
  const { data: transactions, isPending, isError, error } = useTransactions()
  const useExpense = useExpenses()
  const [expenseData, setExpenseData] = useState(expenses)
  
  const [warning, setWarning] = useState(false)
  const [difference, setDifference] = useState('$0.00')
  const [actual, setActual] = useState('') // Grab this as ALL transactions relating to the "type"

  if(isPending) {
    return <p>Loading...</p>
  }
  if(isError) {
    return <p>Error! {error.toString()}</p>
  }

  // This is NOT a great solution right now, but will be fixed later
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    updateDifference()
    countActualAmount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actual, expenseData.expected, transactions])
  
  const isDateBetween = (dateToCheck: Date, startDate: Date, endDate: Date) => {
    dateToCheck = new Date(dateToCheck)
    return dateToCheck >= new Date(startDate) && dateToCheck <= new Date(endDate)
  }
  
  const countActualAmount = async () => {
    if (transactions) {
      const amounts = transactions.filter(transaction => transaction.type === expenseData.type && isDateBetween(transactions.date, dates.startDate, dates.endDate)).map(transaction => transaction.amount)
      if (amounts.length !== 0) {
        const count = amounts.reduce((acc, curr) => `${Number(acc) + Number(curr)}`)
        setActual(Number(count).toFixed(2))
      } else {
        setActual(expenseData.expected)
      }      
    }
  }

  const updateDifference = () => {
    const expectedNum = Number(expenseData.expected.replace('$', ''))
    const actualNum = Number(actual.replace('$', ''))
    setDifference(`${(expectedNum - actualNum).toFixed(2)}`)
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    switch(name) {
      case 'expected':
        setExpenseData((prev) => ({...prev, [name]: value.replace('$', '')}))
        break
      default:
        setExpenseData((prev) => ({...prev, [name]: value}))
        break
    }
    setWarning(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    expenseData.expected = `${Number(expenseData.expected).toFixed(2)}`
    await useExpense.update.mutateAsync(expenseData)
    setWarning(false)
  }

  return (
    <div className="income_component">
      <form onSubmit={handleSubmit}>
        {warning && <div className="warning">!</div>}
        <input
          className="name"
          name="name"
          value={expenseData.name}
          onChange={handleChange}
          placeholder="name"
        />
        <input
          className="type"
          name="type"
          value={expenseData.type}
          onChange={handleChange}
          placeholder="type"
        />
        <select className="frequency" id='frequency' name="frequency" value={expenseData.frequency} onChange={handleChange}>
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
          <option value="fornightly">fortnightly</option>
          <option value="monthly">monthly</option>
          <option value="bi-monthly">fortmonthly</option>
          <option value="bi-yearly">bi-yearly</option>
          <option value="yearly">yearly</option>
        </select>
        <input 
          className="date"
          name="date"
          value={expenseData.date}
          onChange={handleChange}
          type="date"
          placeholder="starting date"
        />
        <input
          className="expected"
          name="expected"
          value={`$${expenseData.expected}`}
          onChange={handleChange}
          placeholder="expected"
        />
        <span className="actual">${actual}</span>
        <span className="difference">${difference}</span>
        <input
          className="notes"
          name="notes"
          value={expenseData.notes}
          onChange={handleChange}
          placeholder="notes"
        />
        {warning && <button type='submit'>✔</button>}
      </form>
    </div>
  )
}

export default ExpenseRow