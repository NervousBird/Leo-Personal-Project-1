import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Transaction } from "../../models/transactions"
import { useTransactions } from "../hooks/useTransactions"
import { useIncomes } from "../hooks/useIncomes"
import { useExpenses } from "../hooks/useExpenses"
import { useSavings } from "../hooks/useSavings.ts"
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
  const { data: savings, isPending: savingsPending, isError: savingsError } = useSavings()
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
    if(incomes && expenses && savings) {
      const types = [...new Set(['empty',
        ...incomes.filter(income => isDateBetween(income.date, dates.startDate, dates.endDate)).map(data => data.type), 
        ...expenses.filter(expense => isDateBetween(expense.date, dates.startDate, dates.endDate)).map(data => data.type),
        ...savings.filter(saving => isDateBetween(saving.startingDate, dates.startDate, dates.endDate)).map(data => data.name)
      ])].filter(type => type !== '')
      setTypesChoice(types)
    }
  }, [incomes, expenses])

  return (
    <div className="transaction_component">
 
      {incomesPending && <p>Loading...</p>}
      {expensesPending && <p>Loading...</p>}
      {savingsPending && <p>Loading...</p>}
      {incomesError && <p>Error loading incomes...</p>}
      {expensesError && <p>Error loading expense...</p>}
      {savingsError && <p>Error loading savings...</p>}

      {incomes && expenses && savings &&
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
