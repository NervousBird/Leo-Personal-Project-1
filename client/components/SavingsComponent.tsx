import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react'
import { useSavings } from '../hooks/useSavings.ts'
import { Savings } from '../../models/savings.ts'
import SavingsRow from './SavingsRow.tsx'
import { Transaction } from '../../models/transactions.ts'
import { isDateBetween } from '../util/date-utils.ts'

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
  const [filteredSavings, setFilteredSavings] = useState([...savings.filter(saving => isDateBetween(saving.startingDate, dates.startDate, dates.endDate))])
  const [searchString, setSearchString] = useState({ search: '' })
  const [sort, setSort] = useState("")
  const filter = useRef("")

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

  const handleHidden = () => {
    setHidden(!hidden)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchString((prev) => ({ ...prev, [name]: value }))
  }

  const handleSort = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement
    if(sort === name) {
      setSort("")
      filter.current = ""
    } else {
      setSort(name)
      filter.current = name
    }
  }

  const updateSort = (filter: string) => {
    switch(filter) {
      case "name":
        setFilteredSavings([...savings.sort((a, b) => {return a.name.localeCompare(b.name)})])
        break
      case "frequency":
        setFilteredSavings([...savings.sort((a, b) => {return a.frequency.localeCompare(b.frequency)})])
        break
      case "date":
        setFilteredSavings([...savings.sort((a, b) => {return (Number(new Date(a.startingDate)) - Number(new Date(b.startingDate)))})])
        break
      case "expected":
        setFilteredSavings([...savings.sort((a, b) => {return Number(b.amount) - Number(a.amount)})])
        break
      case "actual":
        setFilteredSavings([...savings.sort((a, b) => {return Number(b.amount) - Number(a.amount)})])
        break
      case "difference":
        setFilteredSavings([...savings.sort((a, b) => {return Number(b.amount) - Number(a.amount)})])
        break
      case "notes":
        setFilteredSavings([...savings.sort((a, b) => {return a.name.localeCompare(b.name)})])
        break
      case "":
        setFilteredSavings([...savings])
        break
    }
  }

  useEffect (() => {
    updateSort(filter.current)
  }, [savings, dates, sort])

  const filterSavings = () => {
    const filter = savings.filter(expense => expense.name.toLowerCase().includes(searchString.search.toLowerCase()))
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
          {hidden && <i className="bi bi-caret-up-fill" />}
          {!hidden && <i className="bi bi-caret-down-fill" />}
        </button>
        <div className="search">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            name="search"
            value={searchString.search}
            onChange={handleChange}
          />
        </div>
      </div>

      <span className="table-header">
        <button name="name" className="name" onClick={handleSort}>Name</button>
        <button name="frequency" className="frequency" onClick={handleSort}>Frequency</button>
        <button name="date" className="date" onClick={handleSort}>Date</button>
        <button name="expected" className="expected" onClick={handleSort}>Expected</button>
        <button name="actual" className="actual" onClick={handleSort}>Actual</button>
        <button name="difference" className="difference" onClick={handleSort}>Difference</button>
        <button name="notes" className="notes" onClick={handleSort}>Notes</button>
      </span>
      {filteredSavings && filteredSavings.map((saving) => (
          <div key={saving.id} className={hidden === true ? 'savings-row hidden' : 'savings-row'}>
            <SavingsRow savings={saving} transactions={transactions} />
            <button onClick={() => handleRemoveSavings(saving)}>X</button>
          </div>
        ))}
      <button onClick={handleNewSavings}>+</button>
    </section>
  )
}

export default SavingsComponent
