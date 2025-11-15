import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Transaction } from "../../models/transactions"
import { useTransactions } from "../hooks/useTransactions"
import { useIncomes } from "../hooks/useIncomes"

function TransactionRow({id, name, type, date, amount, notes}: Transaction) {
  const { data: incomes } = useIncomes()
  const useTransaction = useTransactions()

  const [warning, setWarning] = useState(false)
  const [typesChoice, setTypesChoice] = useState([''])

  const [transaction, setTransaction] = useState({
    id,
    name,
    type,
    date,
    amount,
    notes,
  })

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
    await useTransaction.update.mutate(transaction)
    setWarning(false)
  }

  const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setTransaction((prev) => ({...prev, type: value}))
    setWarning(true)
  }

  useEffect(() => {
    if(incomes) {
      setTypesChoice(incomes.map(data => data.type))
    }
  }, [incomes])

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