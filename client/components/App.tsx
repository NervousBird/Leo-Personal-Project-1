import IncomeComponent from './IncomeComponent.tsx'
import ExpenseComponent from './ExpenseComponent.tsx'
import TransactionComponent from './TransactionComponent.tsx'

function App() {

  return (
    <>
      <div className="app">
        <header>
          <h1>Finances</h1>
        </header>

        <nav>
          <button>Summary</button>
          <button>Incomes</button>
          <button>Expenses</button>
          <button>Transactions</button>
        </nav>

        <main>
          <IncomeComponent />
          <ExpenseComponent />
          <TransactionComponent />
        </main>
        
      </div>
    </>
  )
}

export default App
