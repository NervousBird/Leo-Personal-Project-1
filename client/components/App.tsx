import IncomeComponent from './IncomeComponent.tsx'
import ExpenseComponent from './ExpenseComponent.tsx'
import TransactionComponent from './TransactionComponent.tsx'
import React, { ChangeEvent, useState } from 'react'
import { useGetDates } from '../hooks/useGetDates.ts'

const currentYear = new Date().getFullYear() 
const currentMonth = new Date().getMonth()

const setDate = [ 
  `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth).getDate().toString().padStart(2, '0')}`,
  `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`,
]
console.log(setDate)

function App() {
  const [dateRange, setDateRange] = useState({ startDate: setDate[0], endDate: setDate[1] })
  const [cycleType, setCycleType] = useState('monthly')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setDateRange((prev) => ({...prev, [name]: value}))
  }

  const handleChangeMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement
    
    const newDates = useGetDates(name, dateRange, cycleType)
    console.log(newDates)
    setDateRange(newDates)
    // Check if set to start and end of month, otherwise load specific
  }

  const handleCycleType = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(cycleType === 'monthly') {
      setCycleType('specific')
    } else {
      setCycleType('monthly')
    }
  }

  return (
    <>
      <div className="app">
        <header>
          <h1>Finances</h1>
        </header>

        <nav>
          {/* <button>Summary</button>
          <button>Incomes</button>
          <button>Expenses</button>
          <button>Transactions</button> */}
          <h2>{new Date().toLocaleString('default', { month: 'long' })}</h2>
          <button value={cycleType} onClick={handleCycleType}>{cycleType.charAt(0).toUpperCase() + cycleType.slice(1)}</button>
          <span>
            <button name="back" onClick={handleChangeMonth}>{'<'}</button>
            <input type='date' id="startDate" name="startDate" value={dateRange.startDate} onChange={handleChange} />
            <input type='date' id="endDate" name="endDate" min={dateRange.startDate} value={dateRange.endDate} onChange={handleChange} />
            <button name="forward" onClick={handleChangeMonth}>{'>'}</button>
          </span>
        </nav>

        <main>
          <IncomeComponent {...dateRange}/>
          <ExpenseComponent {...dateRange}/>
          <TransactionComponent {...dateRange}/>
        </main>
        
      </div>
    </>
  )
}

export default App
