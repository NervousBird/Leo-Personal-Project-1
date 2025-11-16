import { useIncomes } from "../hooks/useIncomes.ts"
import { Income } from '../../models/incomes.ts'
import IncomeRow from "./IncomeRow.tsx"

interface Props {
  startDate: string
  endDate: string
}

function IncomeComponent(dates: Props) {
  const { data: incomes, isPending, isError, error } = useIncomes()
  const useIncome = useIncomes()

  if(isPending) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>Something went wrong. {error.toString()}</p>
  }

  const handleNewIncome = async () => {
    const today = new Date()
    try {
      await useIncome.add.mutateAsync({
        name: '',
        type: '',
        frequency: ``,
        date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate().toString().padStart(2, '0')}`,
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

  const isDateBetween = (dateToCheck: string | Date, startDate: string | Date, endDate: string | Date) => {
    dateToCheck = new Date(dateToCheck)
    return dateToCheck >= new Date(startDate) && dateToCheck <= new Date(endDate)
  }

  const handleAddIncomes = (incomeData: Income) => {
    incomes.filter((income: Income) => income.type === incomeData.type && isDateBetween(income.date, incomeData.date, '2025-12-31'))
  }

  return (
    <section>
      <span className='table-header'>
        <h4 className='name'>Name</h4>
        <h4 className='type'>Type</h4>
        <h4 className='frequency'>Frequency</h4>
        <h4 className='start'>Start Date</h4>
        <h4 className='expected'>Expected</h4>
        <h4 className='actual'>Actual</h4>
        <h4 className='difference'>Difference</h4>
        <h4 className='notes'>Notes</h4>
      </span>
      {incomes && incomes.filter(income => isDateBetween(income.date, dates.startDate, dates.endDate)).map(income =>
          <div key={income.id} className='income-row'>
            <IncomeRow {...income} {...dates} />
            <button onClick={() => handleRemoveIncome(income)}>X</button>
          </div>
        )}
      <button onClick={handleNewIncome}>+</button>
    </section>
  )
}

export default IncomeComponent