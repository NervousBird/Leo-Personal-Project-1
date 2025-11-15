import { useExpenses } from "../hooks/useExpenses"
import { Expense } from "../../models/expenses"
import ExpenseRow from "./ExpenseRow"


function ExpenseComponent() {
  const { data: expenses, isPending, isError, error } = useExpenses()
  const useExpense = useExpenses()
  
  if(isPending) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>Something went wrong. {error.toString()}</p>
  }

  const handleNewExpense = async () => {
    const today = new Date()
    try {
      await useExpense.add.mutateAsync({
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
  
  const handleRemoveExpense = async (id: Expense) => {
    await useExpense.delete.mutateAsync(id)
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
      {expenses && expenses.map(expense => 
        <div key={expense.id} className='expense-row'>
          <ExpenseRow {...expense}/>
          <button onClick={() => handleRemoveExpense(expense)}>X</button>
        </div>
      )}
      <button onClick={handleNewExpense}>+</button>
    </section>
  )
}

export default ExpenseComponent