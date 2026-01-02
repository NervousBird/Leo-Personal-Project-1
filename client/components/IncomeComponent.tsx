import { useIncomes } from "../hooks/useIncomes.ts"
import { useState } from "react"
import { Income } from '../../models/incomes.ts'
import IncomeRow from "./IncomeRow.tsx"
import { Transaction } from "../../models/transactions.ts"

interface Props {
  incomes: Income[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
}

function IncomeComponent({ incomes, transactions, dates }: Props) {
  const useIncome = useIncomes()
  const [hidden, setHidden] = useState(false)

  const handleNewIncome = async () => {
    try {
      await useIncome.add.mutateAsync({
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
  
  const handleRemoveIncome = async (id: Income) => {
    await useIncome.delete.mutateAsync(id)
  }

  const isDateBetween = (dateToCheck: string, startDate: string, endDate: string) => {
    const result = new Date(dateToCheck) >= new Date(startDate) && new Date(dateToCheck) <= new Date(endDate)
    return result
  }

  const handleHidden = () => {
    setHidden(!hidden)
  }

  return (
    <section className="income-component">
      <button className="title" onClick={handleHidden}>
        <h3>Incomes</h3>
        {hidden  && <i className="bi bi-caret-up-fill" />}
        {!hidden  && <i className="bi bi-caret-down-fill" />}
      </button>
      <span className='table-header'>
        <h4 className='name'>Name</h4>
        <h4 className='type'>Type</h4>
        <h4 className='frequency'>Frequency</h4>
        <h4 className='date'>Date</h4>
        <h4 className='expected'>Expected</h4>
        <h4 className='actual'>Actual</h4>
        <h4 className='difference'>Difference</h4>
        <h4 className='notes'>Notes</h4>
      </span>
      {incomes && incomes.filter(income => isDateBetween(income.date, dates.startDate, dates.endDate)).map(income =>
          <div key={income.id} className={hidden === true ? "income-row hidden" : "income-row"}>
            <IncomeRow incomes={income} transactions={transactions} />
            <button onClick={() => handleRemoveIncome(income)}>X</button>
          </div>
        )}
      <button onClick={handleNewIncome}>+</button>
    </section>
  )
}

export default IncomeComponent
