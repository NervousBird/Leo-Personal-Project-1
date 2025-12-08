import IncomeComponent from '../components/IncomeComponent.tsx'
import ExpenseComponent from '../components/ExpenseComponent.tsx'
import TransactionComponent from '../components/TransactionComponent.tsx'
import ReccuringForm from '../components/ReccuringForm.tsx'
import { Expense } from '../../models/expenses.ts'
import { Income } from '../../models/incomes.ts'
import { Transaction } from '../../models/transactions.ts'
import { ChangeEvent } from 'react'

interface Props {
  incomes: Income[]
  expenses: Expense[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
  dateTitle: string[]
  cycleType: string
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onHandleChangeMonth: (e: React.MouseEvent<HTMLButtonElement>) => void
  onHandleCycleType: () => void
}

function Finances({ incomes, expenses, transactions, dates, dateTitle, cycleType, onHandleChange, onHandleChangeMonth, onHandleCycleType }: Props) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onHandleChange(e)
  }

  const handleChangeMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    onHandleChangeMonth(e)
  }

  const handleCycleType = () => {
    onHandleCycleType()
  }

  return (
    <>
      <div className='app'>

        <section>
          <ReccuringForm />
        </section>

        <nav className='finance-nav'>
          <span className='monthtitle-container'>
            {dateTitle && dateTitle.map((month, idx) => <h3 key={idx}>{month}</h3>)}
          </span>
          <button 
            value={cycleType} 
            onClick={handleCycleType}>
            {cycleType.charAt(0).toUpperCase() + cycleType.slice(1)}
          </button>
          <span>
            <button name='back' onClick={handleChangeMonth}>{'<'}</button>
            <input 
              type='date' 
              id='startDate'
              name='startDate'
              value={dates.startDate} 
              onChange={handleChange} 
            />
            <input 
              type='date' 
              id='endDate'
              name='endDate'
              min={dates.startDate} 
              value={dates.endDate} 
              onChange={handleChange} 
            />
            <button name='forward' onClick={handleChangeMonth}>{'>'}</button>
          </span>
        </nav>

        {dates && 
          <main>
            {incomes && transactions &&
              <IncomeComponent incomes={incomes} transactions={transactions} dates={dates}/>
            }
            {expenses && transactions &&
              <ExpenseComponent expenses={expenses} transactions={transactions} dates={dates} />
            }
            {transactions &&
              <TransactionComponent transactions={transactions} dates={dates} />
            }
          </main>
        }
        
      </div>
    </>
  )
}

export default Finances