import { useIncomes } from "../hooks/useIncomes.ts"
import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from "react"
import { Income } from '../../models/incomes.ts'
import IncomeRow from "./IncomeRow.tsx"
import { Transaction } from "../../models/transactions.ts"

interface Props {
  incomes: Income[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
}

function IncomeComponent({ incomes, transactions, dates }: Props) {
  const useIncome = useIncomes()
  const [hidden, setHidden] = useState(false)
  const [filteredIncomes, setFilteredIncomes] = useState(incomes)
  const [searchString, setSearchString] = useState({ search: "" })
  const [sort, setSort] = useState("")
  const filter = useRef("")

  const handleNewIncome = async () => {
    try {
      await useIncome.add.mutateAsync({
        name: '',
        type: '',
        frequency: `weekly`,
        date: `${dates.startDate}`,
        expected: '0.00',
        notes: '',
      })
    } catch (error) {
      console.error('Error adding income:', error)
    }
  }

  const handleRemoveIncome = async (id: Income) => {
    await useIncome.delete.mutateAsync(id)
  }

  const handleHidden = () => {
    setHidden(!hidden)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchString((prev) => ({...prev, [name]: value}))
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
        setFilteredIncomes([...incomes.sort((a, b) => {return a.name.localeCompare(b.name)})])
        break
      case "type":
        setFilteredIncomes([...incomes.sort((a, b) => {return a.type.localeCompare(b.type)})])
        break
      case "frequency":
        setFilteredIncomes([...incomes.sort((a, b) => {return a.frequency.localeCompare(b.frequency)})])
        break
      case "date":
        setFilteredIncomes([...incomes.sort((a, b) => {return (Number(new Date(a.date)) - Number(new Date(b.date)))})])
        break
      case "expected":
        setFilteredIncomes([...incomes.sort((a, b) => {return Number(b.expected) - Number(a.expected)})])
        break
      case "actual":
        setFilteredIncomes([...incomes.sort((a, b) => {return Number(b.expected) - Number(a.expected)})])
        break
      case "difference":
        setFilteredIncomes([...incomes.sort((a, b) => {return Number(b.expected) - Number(a.expected)})])
        break
      case "notes":
        setFilteredIncomes([...incomes.sort((a, b) => {return a.name.localeCompare(b.name)})])
        break
      case "":
        setFilteredIncomes([...incomes])
        break
    }
  }

  useEffect (() => {
    updateSort(filter.current)
  }, [incomes, dates, sort])

  const filterIncome = () => {
    const filter = incomes.filter(income => income.name.toLowerCase().includes(searchString.search.toLowerCase()))
    setFilteredIncomes(filter)
  }

  useEffect(() => {
    filterIncome()
  }, [incomes, dates, searchString])

  return (
    <section className="income-component">
      <div className="topbar">
        <button className="title" onClick={handleHidden}>
          <h3>Incomes</h3>
          {hidden  && <i className="bi bi-caret-up-fill" />}
          {!hidden  && <i className="bi bi-caret-down-fill" />}
        </button>
        <div className="search">
          <label htmlFor="search">Search:</label>
          <input id="search" type="text" name="search" value={searchString.search} onChange={handleChange} />
        </div>
      </div>

      <span className='table-header'>
        <button name="name" className="name" onClick={handleSort}>Name</button>
        <button name="type" className="type" onClick={handleSort}>type</button>
        <button name="frequency" className="frequency" onClick={handleSort}>Frequency</button>
        <button name="date" className="date" onClick={handleSort}>Date</button>
        <button name="expected" className="expected" onClick={handleSort}>Expected</button>
        <button name="actual" className="actual" onClick={handleSort}>Actual</button>
        <button name="difference" className="difference" onClick={handleSort}>Difference</button>
        <button name="notes" className="notes" onClick={handleSort}>Notes</button>
      </span>

      {filteredIncomes && filteredIncomes.map(income =>
          <div key={income.id} className={hidden === true ? "income-row hidden" : "income-row"}>
            <IncomeRow incomes={income} transactions={transactions} />
            <button onClick={() => handleRemoveIncome(income)}>X</button>
          </div>
      )}
      <button onClick={handleNewIncome}>+</button>
    </section>
  )
}

export default IncomeComponent
