import Transaction from './Transaction.tsx'
import Income from './Income.tsx'
import { useState } from 'react'

function App() {
  
  const newIncomeObject = {
    id: 1,
    name: '',
    type: '',
    frequency: '',
    date: '',
    expected: '',
    actual: '',
    difference: '',
    notes: '',
  }

  const [incomes, setIncomes] = useState([newIncomeObject])


  const handleNewIncome = () => {
    if(incomes.length === 0) {
      setIncomes([...incomes, newIncomeObject])
    } else {
      const id = incomes[incomes.length - 1].id + 1
      setIncomes([...incomes, {...newIncomeObject, id: id}])
    }
  }

  const handleRemoveIncome = (id: number) => {
    const newIncome = incomes.filter(income => income.id != id)
    setIncomes(newIncome)
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
          {incomes.map(income => 
            <div key={income.id} className='income-row'>
              <span>{income.id}</span>
              <Income />
              <button onClick={() => handleRemoveIncome(income.id)}>X</button>
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
