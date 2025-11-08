import { useIncomes } from '../hooks/useIncomes.ts'
import IncomeRow from './Income.tsx'
import { useState } from 'react'

function App() {
  const { data } = useIncomes()

  // console.log(data[0])

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

  const [incomesState, setIncomesState] = useState([newIncomeObject])


  const handleNewIncome = () => {
    if(incomesState.length === 0) {
      setIncomesState([...incomesState, newIncomeObject])
    } else {
      const id = incomesState[incomesState.length - 1].id + 1
      setIncomesState([...incomesState, {...newIncomeObject, id: id}])
    }
  }

  const handleRemoveIncome = (id: number) => {
    const newIncome = incomesState.filter(income => income.id != id)
    setIncomesState(newIncome)
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
          {incomesState.map(income => 
            <div key={income.id} className='income-row'>
              <span>{income.id}</span>
              <IncomeRow {...newIncomeObject} />
              <button onClick={() => handleRemoveIncome(income.id)}>X</button>
            </div>
          )}

          {data && data.map(income => 
            <div key={income.id} className='income-row'>
              <span>{income.id}</span>
              <IncomeRow {...income}/>
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
