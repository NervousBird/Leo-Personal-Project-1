import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Transaction } from "../../models/transactions"
import { useTransactions } from "../hooks/useTransactions"
import { useIncomes } from "../hooks/useIncomes"
import { useExpenses } from "../hooks/useExpenses"

interface Props {
  transactionData: Transaction
  dates: {
    startDate: string
    endDate: string
  }
}

function TransactionRow({ transactionData, dates }: Props) {
  // FIX THIS TO BE ONE ROUTE TO GRAB BOTH
  const { data: incomes } = useIncomes()
  const { data: expenses } = useExpenses()
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

  const isDateBetween = (dateToCheck: string, startDate: string, endDate: string) => {
    const result = new Date(dateToCheck) >= new Date(startDate) && new Date(dateToCheck) <= new Date(endDate)
    return result
  }

  useEffect(() => {
    if(incomes && expenses) {
      const types = [...new Set([...incomes.filter(income => isDateBetween(income.date, dates.startDate, dates.endDate)).map(data => data.type), ...expenses.filter(expense => isDateBetween(expense.date, dates.startDate, dates.endDate)).map(data => data.type)])]
      setTypesChoice(types)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomes, expenses])

  return (
    <div className="transaction_component">
      <form onSubmit={handleSubmit}>
        {warning && <div className="warning">!</div>}
        <input 
          name="name"
          value={transaction.name}
          onChange={handleChange}
          placeholder="name"
        />
        <select name="type" value={transaction.type} defaultValue={'type'} onChange={handleType}>
          {typesChoice.map((type,idx) =>
            <option key={idx} value={type}>{type}</option>
          )}
        </select>
        <input
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
    </div>
  )
}

export default TransactionRow