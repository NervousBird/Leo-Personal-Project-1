import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Income } from "../../models/incomes"
import { useUpdateIncome } from "../hooks/useIncomes"
import { useTransactions } from "../hooks/useTransactions"

function IncomeRow({id, name, type, frequency, date, expected, notes}: Income) {
  const { data: transactions } = useTransactions()
  const [warning, setWarning] = useState(false)
  const [difference, setDifference] = useState('$0.00')
  const [actual, setActual] = useState('') // Grab this as ALL transactions relating to the "type"
  const updateIncome = useUpdateIncome()
  const [data, setData] = useState({
    id,
    name,
    type,
    frequency,
    date,
    expected,
    notes,
  })

  const countActualAmount = async () => {
    if (transactions) {
      const amounts = transactions.filter(transaction => transaction.type == type).map(transaction => transaction.amount)
      console.log('amounts', amounts, type)
      if (amounts.length !== 0) {
        const count = amounts.reduce((acc, curr) => `${Number(acc) + Number(curr)}`)
        console.log('count', type, count)
        setActual(count)
      } else {
        setActual(data.expected)
      }      
    }
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    switch(name) {
      case 'expected':
        setData((prev) => ({...prev, [name]: value.replace('$', '')}))
        break
      default:
        setData((prev) => ({...prev, [name]: value}))
        break
    }
    setWarning(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    data.expected = `${Number(data.expected).toFixed(2)}`
    await updateIncome.mutateAsync(data)
    setWarning(false)
  }

  const updateDifference = () => {
    const expectedNum = Number(data.expected.replace('$', ''))
    const actualNum = Number(actual.replace('$', ''))
    setDifference(`$${(actualNum - expectedNum).toFixed(2)}`)
  }

  useEffect(() => {
    updateDifference()
    countActualAmount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actual, data.expected, transactions])

  return (
    <div className="income_component">
      <form onSubmit={handleSubmit}>
        {warning && <div className="warning">!</div>}
        <input
          className="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="name"
        />
        <input
          className="type"
          name="type"
          value={data.type}
          onChange={handleChange}
          placeholder="type"
        />
        <select className="frequency" id='frequency' name="frequency" value={data.frequency} onChange={handleChange}>
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
          value={data.date}
          onChange={handleChange}
          type="date"
          placeholder="starting date"
        />
        <input
          className="expected"
          name="expected"
          value={`$${data.expected}`}
          onChange={handleChange}
          placeholder="expected"
        />
        <span>{'$' + actual}</span>
        <span>{difference}</span>
        <input
          className="notes"
          name="notes"
          value={data.notes}
          onChange={handleChange}
          placeholder="notes"
        />
        {warning && <button type='submit'>✔</button>}
      </form>
    </div>
  )
}

export default IncomeRow