import { useState, useEffect, ChangeEvent } from "react"
import { useSavings } from "../hooks/useSavings.ts"
import { Savings } from '../../models/savings.ts'
import SavingsRow from "./SavingsRow.tsx"
import { Transaction } from "../../models/transactions.ts"

interface Props {
  savings: Savings[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
}

function SavingsComponent({ savings, transactions, dates }: Props) {
  const useSaving = useSavings()
  const [hidden, setHidden] = useState(false)
  const [filteredSavings, setFilteredSavings] = useState(savings)
  const [searchString, setSearchString] = useState({ search: "" })

  const handleNewSavings = async () => {
    try {
      await useSaving.add.mutateAsync({
        name: '',
        amount: '0.00',
        frequency: `weekly`,
        startingDate: `${dates.startDate}`,
        notes: '',
      })
    } catch (error) {
      console.error('Error adding income:', error)
    }
  }

  const handleRemoveSavings = async (id: Savings) => {
    await useSaving.delete.mutateAsync(id)
  }

  const isDateBetween = (dateToCheck: string, startDate: string, endDate: string) => {
    const result = new Date(dateToCheck) >= new Date(startDate) && new Date(dateToCheck) <= new Date(endDate)
    return result
  }

  const handleHidden = () => {
    setHidden(!hidden)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchString((prev) => ({...prev, [name]: value}))
  }

  const filterSavings = () => {
    let filter = savings.filter(saving=> isDateBetween(saving.startingDate, dates.startDate, dates.endDate))
    if(searchString.search !== "") {
      filter = filter.filter(saving=> saving.name.toLowerCase().includes(searchString.search.toLowerCase()))
    }
    setFilteredSavings(filter)
  }

  useEffect(() => {
    filterSavings()
  }, [savings, dates, searchString])

  return (
    <section className="savings-component">
      <div className="topbar">
        <button className="title" onClick={handleHidden}>
          <h3>Savings</h3>
          {hidden  && <i className="bi bi-caret-up-fill" />}
          {!hidden  && <i className="bi bi-caret-down-fill" />}
        </button>
        <div className="search">
          <label htmlFor="search">Search:</label>
          <input id="search" type="text" name="search" value={searchString.search} onChange={handleChange} />
        </div>
      </div>

      <span className='table-header'>
        <h4 className='name'>Name</h4>
        <h4 className='frequency'>Frequency</h4>
        <h4 className='date'>Date</h4>
        <h4 className='expected'>Expected</h4>
        <h4 className='actual'>Actual</h4>
        <h4 className='difference'>Difference</h4>
        <h4 className='notes'>Notes</h4>
      </span>
      {filteredSavings && filteredSavings.map(saving=>
          <div key={saving.id} className={hidden === true ? "savings-row hidden" : "savings-row"}>
            <SavingsRow savings={saving} transactions={transactions} />
            <button onClick={() => handleRemoveSavings(saving)}>X</button>
          </div>
      )}
      <button onClick={handleNewSavings}>+</button>
    </section>
  )
}

export default SavingsComponent
