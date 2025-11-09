import { Income } from '../../models/incomes.ts'
import { useAddIncome, useDeleteIncome, useIncomes } from '../hooks/useIncomes.ts'
import IncomeRow from './Income.tsx'

function App() {
  const { data } = useIncomes()
  const addIncome = useAddIncome()
  const deleteIncome = useDeleteIncome()

  const today = new Date()

  const handleNewIncome = async () => {
    try {
      await addIncome.mutateAsync({
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
    await deleteIncome.mutateAsync(id)
  }

  return (
    <>
      <div className="app">
        <h1>Finances</h1>
        <header>

        </header>
        <nav>
          <button>Summary</button>
          <button>Incomes</button>
          <button>Expenses</button>
          <button>Transactions</button>
        </nav>
        <main>
          <span className='table-header'>
            <h4>Name</h4>
            <h4>Type</h4>
            <h4>Frequency</h4>
            <h4>Start Date</h4>
            <h4>Expected</h4>
            <h4 className='actual'>Actual</h4>
            <h4 className='difference'>Difference</h4>
            <h4 className='notes'>Notes</h4>
          </span>
          {data && data.map(income =>
            <div key={income.id} className='income-row'>
              {/* <span>{income.id}</span> */}
              <IncomeRow {...income}/>
              <button onClick={() => handleRemoveIncome(income)}>X</button>
            </div>
          )}

          <button onClick={handleNewIncome}>+</button>
        </main>
        {/* <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul> */}
        {/* <Transaction /> */}
        {/* <Income /> */}
      </div>
    </>
  )
}

export default App
