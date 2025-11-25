import IncomeComponent from './IncomeComponent.tsx'
import ExpenseComponent from './ExpenseComponent.tsx'
import TransactionComponent from './TransactionComponent.tsx'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { changeDatesByMonth, getMonthAsWord } from '../util/date-utils.ts'
import ReccuringForm from './ReccuringForm.tsx'

const currentYear = new Date().getFullYear() 
const currentMonth = new Date().getMonth()

const setDate = [ 
  `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth).getDate().toString().padStart(2, '0')}`,
  `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`,
]


function App() {
  const [dateRange, setDateRange] = useState({ startDate: setDate[0], endDate: setDate[1] })
  const [cycleType, setCycleType] = useState('monthly')
  const [dateTitle, setDateTitle] = useState([] as string[])

  useEffect(() => {
    updateMonthDisplay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dateRange])

  const updateMonthDisplay = () => {
    const newDateTitle = getMonthAsWord(dateRange)
    const removeDuplicates = newDateTitle[0] === newDateTitle[1] ? [newDateTitle[1]] : [newDateTitle[0], newDateTitle[1]]
    setDateTitle(removeDuplicates)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDateRange((prev) => ({...prev, [name]: value}))
  }

  const handleChangeMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name: direction } = e.target as HTMLButtonElement
    
    const newDates = changeDatesByMonth(direction, dateRange, cycleType)
    setDateRange(newDates)
    // Check if set to start and end of month, otherwise load specific
  }

  const handleCycleType = () => {
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
          <h1>2025</h1>
        </header>

        <section>
          <ReccuringForm />
        </section>

        <nav>
          <span className='monthtitle-container'>
          {dateTitle && dateTitle.map((month, idx) => <h2 key={idx}>{month}</h2>)}
          </span>
          <button value={cycleType} onClick={handleCycleType}>{cycleType.charAt(0).toUpperCase() + cycleType.slice(1)}</button>
          <span>
            <button name="back" onClick={handleChangeMonth}>{'<'}</button>
            <input type='date' id="startDate" name="startDate" value={dateRange.startDate} onChange={handleChange} />
            <input type='date' id="endDate" name="endDate" min={dateRange.startDate} value={dateRange.endDate} onChange={handleChange} />
            <button name="forward" onClick={handleChangeMonth}>{'>'}</button>
          </span>
        </nav>

        {dateRange && <main>
          <IncomeComponent {...dateRange}/>
          <ExpenseComponent {...dateRange}/>
          <TransactionComponent {...dateRange}/>
        </main>}
        
      </div>
    </>
  )
}

export default App
