import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Income } from "../../models/incomes"
import { useIncomes } from "../hooks/useIncomes"
import { useTransactions } from "../hooks/useTransactions"

function IncomeRow(incomes: Income) {
  const { data: transactions, isPending, isError, error } = useTransactions()
  const useIncome = useIncomes()
  const [incomeData, setIncomeData] = useState(incomes)
  
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
  }, [actual, incomeData.expected, transactions])

  const countActualAmount = async () => {
    if (transactions) {
      const amounts = transactions.filter(transaction => transaction.type === incomeData.type).map(transaction => transaction.amount)
      if (amounts.length !== 0) {
        const count = amounts.reduce((acc, curr) => `${Number(acc) + Number(curr)}`)
        setActual(Number(count).toFixed(2))
      } else {
        setActual(incomeData.expected)
      }      
    }
  }

  const updateDifference = () => {
    const expectedNum = Number(incomeData.expected.replace('$', ''))
    const actualNum = Number(actual.replace('$', ''))
    setDifference(`${(actualNum - expectedNum).toFixed(2)}`)
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    switch(name) {
      case 'expected':
        setIncomeData((prev) => ({...prev, [name]: value.replace('$', '')}))
        break
      default:
        setIncomeData((prev) => ({...prev, [name]: value}))
        break
    }
    setWarning(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    incomeData.expected = `${Number(incomeData.expected).toFixed(2)}`
    await useIncome.update.mutateAsync(incomeData)
    setWarning(false)
  }

  return (
    <div className="income_component">
      <form onSubmit={handleSubmit}>
        {warning && <div className="warning">!</div>}
        <input
          className="name"
          name="name"
          value={incomeData.name}
          onChange={handleChange}
          placeholder="name"
        />
        <input
          className="type"
          name="type"
          value={incomeData.type}
          onChange={handleChange}
          placeholder="type"
        />
        <select className="frequency" id='frequency' name="frequency" value={incomeData.frequency} onChange={handleChange}>
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
          value={incomeData.date}
          onChange={handleChange}
          type="date"
          placeholder="starting date"
        />
        <input
          className="expected"
          name="expected"
          value={`$${incomeData.expected}`}
          onChange={handleChange}
          placeholder="expected"
        />
        <span className="actual">${actual}</span>
        <span className="difference">${difference}</span>
        <input
          className="notes"
          name="notes"
          value={incomeData.notes}
          onChange={handleChange}
          placeholder="notes"
        />
        {warning && <button type='submit'>✔</button>}
      </form>
    </div>
  )
}

export default IncomeRow