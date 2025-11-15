import { useIncomes } from "../hooks/useIncomes.ts"
import { Income } from '../../models/incomes.ts'
import IncomeRow from "./IncomeRow.tsx"


function IncomeComponent() {
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

  return (
    <div>
      {incomes && incomes.map(income =>
          <div key={income.id} className='income-row'>
            <IncomeRow {...income}/>
            <button onClick={() => handleRemoveIncome(income)}>X</button>
          </div>
        )}
      <button onClick={handleNewIncome}>+</button>
    </div>
  )
}

export default IncomeComponent