import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Transaction } from "../../models/transactions"
import { useTransactions } from "../hooks/useTransactions"
import { useIncomes } from "../hooks/useIncomes"
import { useExpenses } from "../hooks/useExpenses"
import { isDateBetween } from "../util/date-utils"

interface Props {
  transactionData: Transaction
  dates: {
    startDate: string
    endDate: string
  }
}

function TransactionRow({ transactionData, dates }: Props) {
  const { data: incomes, isPending: incomesPending, isError: incomesError } = useIncomes()
  const { data: expenses, isPending: expensesPending, isError: expensesError } = useExpenses()
  const useTransaction = useTransactions()

  const [warning, setWarning] = useState(false)
  const [typesChoice, setTypesChoice] = useState([''])

  const [transaction, setTransaction] = useState(transactionData)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    switch(name) {
      case 'amount':
        setTransaction((prev) => ({...prev, [name]: value.replace('$', '')}))
        break
      default:
        setTransaction((prev) => ({...prev, [name]: value}))
        break
    }
    setWarning(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    transaction.amount = `${Number(transaction.amount).toFixed(2)}`
    await useTransaction.update.mutateAsync(transaction)
    setWarning(false)
  }

  const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setTransaction((prev) => ({...prev, type: value}))
    setWarning(true)
  }

  useEffect(() => {
    if(incomes && expenses) {
      const types = [...new Set(['empty',
        ...incomes.filter(income => isDateBetween(income.date, dates.startDate, dates.endDate)).map(data => data.type), 
        ...expenses.filter(expense => isDateBetween(expense.date, dates.startDate, dates.endDate)).map(data => data.type),
      ])].filter(type => type !== '')
      setTypesChoice(types)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomes, expenses])

  return (
    <div className="transaction_component">
      
      {incomesPending && <p>Loading...</p>}
      {expensesPending && <p>Loading...</p>}
      {incomesError && <p>Error loading incomes...</p>}
      {expensesError && <p>Error loading expense...</p>}

      {incomes && expenses && 
        <form onSubmit={handleSubmit}>
          {warning && <div className="warning">!</div>}
          <input
            className="name"
            name="name"
            value={transaction.name}
            onChange={handleChange}
            placeholder="name"
          />
          <select 
            className="type"
            name="type" 
            value={transaction.type} 
            onChange={handleType}>
            {typesChoice.map((type,idx) =>
              <option key={idx} value={type}>{type}</option>
            )}
          </select>
          <input
            className="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            type="date"
            placeholder="date" 
          />
          <input 
            className="amount"
            name="amount"
            value={`$${transaction.amount}`}
            onChange={handleChange}
            placeholder="amount"
          />
          <input 
            className="notes"
            name="notes"
            value={transaction.notes}
            onChange={handleChange}
            placeholder="notes"
          />
          {warning && <button type='submit'>✔</button>}
        </form>
      }
    </div>
  )
}

export default TransactionRow