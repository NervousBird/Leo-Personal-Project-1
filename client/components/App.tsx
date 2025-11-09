import { useEffect, useState } from 'react'
import { Income } from '../../models/incomes.ts'
import { useAddIncome, useDeleteIncome, useIncomes } from '../hooks/useIncomes.ts'
import IncomeRow from './Income.tsx'
import TransactionRow from './Transaction.tsx'
import { useAddTransaction, useDeleteTransaction, useTransactions } from '../hooks/useTransactions.ts'
import { Transaction } from '../../models/transactions.ts'

function App() {
  const { data: incomes } = useIncomes()
  const { data: transactions } = useTransactions()
  const addIncome = useAddIncome()
  const deleteIncome = useDeleteIncome()
  const addTransaction = useAddTransaction()
  const deleteTransaction = useDeleteTransaction()
  const [types, setTypes] = useState([''])

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

  const handleNewTransaction = async () => {
    try {
      await addTransaction.mutateAsync({
        name: '',
        type: 'type',
        date: ``,
        amount: '0.00',
        notes: '',
      })
    } catch (error) {
      console.error('Error adding income:', error)
    }
  }

  const handleRemoveTransaction = async (id: Transaction) => {
    await deleteTransaction.mutateAsync(id)
  }

  useEffect(() => {
    if(incomes) {
      setTypes(incomes.map(income => income.type))
    }
  }, [incomes])

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
          {incomes && incomes.map(income =>
            <div key={income.id} className='income-row'>
              {/* <span>{income.id}</span> */}
              <IncomeRow {...income}/>
              <button onClick={() => handleRemoveIncome(income)}>X</button>
            </div>
          )}
          <button onClick={handleNewIncome}>+</button>

          {transactions && transactions.map(transaction => 
            <div key={transaction.id} className='transaction-row'>
              <TransactionRow { ...transaction } />
              <button onClick={() => handleRemoveTransaction(transaction)}>X</button>
            </div>
          )}
          <button onClick={handleNewTransaction}>+</button>
        </main>
        
      </div>
    </>
  )
}

export default App
