import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Savings } from "../../models/savings.ts"
import { useSavings } from "../hooks/useSavings.ts"
import { Transaction } from "../../models/transactions.ts"
import { getNextDate, isDateBetween } from "../util/date-utils"

interface Props {
  savings: Savings
  transactions: Transaction[]
}

function IncomeRow({ savings, transactions }: Props) {
  const useSaving = useSavings()
  const [savingsData, setSavingsData] = useState(savings)

  const [warning, setWarning] = useState(false)
  const [difference, setDifference] = useState('$0.00')
  const [actual, setActual] = useState('')

  useEffect(() => {
    updateDifference()
    countActualAmount()
  }, [savings, actual, transactions, savingsData.amount])

  const countActualAmount = async () => {
    if (transactions) {
      const startDate = savingsData.startingDate
      const endDate = getNextDate(startDate, savingsData.frequency)
      const amounts = transactions.filter(transaction =>
        transaction.type === savingsData.name &&
        isDateBetween(transaction.date, startDate, endDate))
        .map(transaction => transaction.amount)

      if (amounts.length !== 0) {
        const count = amounts.reduce((acc, curr) => `${Number(acc) + Number(curr)}`)
        setActual(Number(count).toFixed(2))
      } else {
        setActual(savingsData.amount)
      }
    }
  }

  const updateDifference = () => {
    const expectedNum = Number(savingsData.amount.replace('$', ''))
    const actualNum = Number(actual.replace('$', ''))
    setDifference(`${(actualNum - expectedNum).toFixed(2)}`)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    switch(name) {
      case 'amount':
        setSavingsData((prev) => ({...prev, [name]: value.replace('$', '')}))
        break
      default:
        setSavingsData((prev) => ({...prev, [name]: value}))
        break
    }
    setWarning(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    console.log(savingsData)
    e.preventDefault()
    savingsData.amount = `${Number(savingsData.amount).toFixed(2)}`
    await useSaving.update.mutateAsync({
      id: savingsData.id,
      name: savingsData.name,
      amount: savingsData.amount,
      frequency: savingsData.frequency,
      startingDate: savingsData.startingDate,
      notes: savingsData.notes,
    })
    setWarning(false)
  }

  return (
    <div className="savings_component">
      <form onSubmit={handleSubmit}>
        {warning && <div className="warning">!</div>}
        <input
          className="name"
          name="name"
          value={savingsData.name}
          onChange={handleChange}
          placeholder="name"
        />
        <select
          className="frequency"
          id='frequency'
          name="frequency"
          value={savingsData.frequency}
          onChange={handleChange}>
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
          name="startingDate"
          value={savingsData.startingDate}
          onChange={handleChange}
          type="date"
          placeholder="starting date"
        />
        <input
          className="expected"
          name="amount"
          value={`$${savingsData.amount}`}
          onChange={handleChange}
          placeholder="expected"
        />
        <span className="actual">${actual}</span>
        <span className="difference">${difference}</span>
        <input
          className="notes"
          name="notes"
          value={savingsData.notes}
          onChange={handleChange}
          placeholder="notes"
        />
        {warning && <button type='submit'>✔</button>}
      </form>
    </div>
  )
}

export default IncomeRow
