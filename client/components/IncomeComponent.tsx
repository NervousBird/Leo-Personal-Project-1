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
        // date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate().toString().padStart(2, '0')}`,
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

  // const handleAddIncomes = async (incomeData: Income) => {
  //   // Get months left
  //   const dateSplit = incomeData.date.split('-')
  //   const year = Number(dateSplit[0])
  //   const month = Number(dateSplit[1])
  //   const day = Number(dateSplit[2])
  //   // Cycle through months to check it type already exists
  //   for(let i = month + 1; i < 13 ; i++) {
  //     const data = incomes.find(income => Number(income.date.split('-')[1]) === i && income.type === incomeData.type)
  //     console.log(incomes.find(income => income.date.split('-')[1]), data)
  //     if(data === undefined) {
  //       console.log('make new income')
  //       await useIncome.add.mutateAsync({
  //         name: incomeData.name, 
  //         type: incomeData.type,
  //         frequency: incomeData.frequency,
  //         date: `${year}-${i.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
  //         expected: incomeData.expected,
  //         notes: incomeData.notes,
  //       })
  //     }
  //   }
  //   // If it doesn't, add duplicate to database

  //   // Create checks for daily, weekly, fornightly, monthly, fortmonthly, bi yearly, quarterly, yearly
  //   // incomes.filter((income: Income) => income.type === incomeData.type && isDateBetween(income.date, incomeData.date, '2025-12-31'))
  // }

  return (
    <section className="income-component">
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
            <IncomeRow incomes={income} dates={dates}/>
            <button onClick={() => handleRemoveIncome(income)}>X</button>
          </div>
        )}
      <button onClick={handleNewIncome}>+</button>
    </section>
  )
}

export default IncomeComponent