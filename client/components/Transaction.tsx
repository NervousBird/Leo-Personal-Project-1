import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Transaction } from "../../models/transactions"
import { useUpdateTransaction } from "../hooks/useTransactions"
import { useIncomes } from "../hooks/useIncomes"

function TransactionRow({id, name, type, date, amount, notes}: Transaction) {
  const { data: incomes } = useIncomes()
  const [warning, setWarning] = useState(false)
  const [typesChoice, setTypesChoice] = useState([''])
  const updateTransaction = useUpdateTransaction()

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
      case 'expected':
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
    await updateTransaction.mutateAsync(transaction)
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
    <>
      <form onSubmit={handleSubmit}>
        {warning && <div className="warning">!</div>}
        <input 
          name="name"
          value={transaction.name}
          onChange={handleChange}
          placeholder="name"
        />
        <select name="type" value={transaction.type} defaultValue={typesChoice[0]} onChange={handleType}>
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
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          placeholder="amount"
        />
        <input 
          name="notes"
          value={transaction.notes}
          onChange={handleChange}
          placeholder="notes"
        />
        {warning && <button type='submit'>✔</button>}
      </form>
    </>
  )
}

export default TransactionRow