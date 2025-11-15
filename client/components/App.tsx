import { Transaction } from '../../models/transactions.ts'
import { useTransactions } from '../hooks/useTransactions.ts'
import TransactionRow from './TransactionRow.tsx'
import IncomeComponent from './IncomeComponent.tsx'
import ExpenseComponent from './ExpenseComponent.tsx'

function App() {
  const { data: transactions } = useTransactions()
  const useTransaction = useTransactions()

  const handleNewTransaction = async () => {
    try {
      await useTransaction.add.mutateAsync({
        name: '',
        type: '',
        date: ``,
        amount: '0.00',
        notes: '',
      })
    } catch (error) {
      console.error('Error adding income:', error)
    }
  }

  const handleRemoveTransaction = async (id: Transaction) => {
    await useTransaction.delete.mutateAsync(id)
  }

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
          <section>
            <span className='table-header'>
              <h4>Name</h4>
              <h4>Type</h4>
              <h4>Date</h4>
              <h4>Amount</h4>
              <h4 className='notes'>Notes</h4>
            </span>
            {transactions && transactions.map(transaction => 
              <div key={transaction.id} className='transaction-row'>
                <TransactionRow { ...transaction } />
                <button onClick={() => handleRemoveTransaction(transaction)}>X</button>
              </div>
            )}
            <button onClick={handleNewTransaction}>+</button>
          </section>
          
        </main>
        
      </div>
    </>
  )
}

export default App
