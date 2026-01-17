import { useIncomes } from "../hooks/useIncomes.ts"
import { useState, useEffect } from "react"
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

  const filterIncome = () => {
    let filter = incomes.filter(income => isDateBetween(income.date, dates.startDate, dates.endDate))
    if(searchString.search !== "") {
      filter = filter.filter(income => income.name.toLowerCase().includes(searchString.search.toLowerCase()))
    }
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
          <input type="text" name="search" value={searchString.search} onChange={handleChange} />
        </div>
      </div>

      <span className='table-header'>
        <h4 className='name'>Name</h4>
        <h4 className='type'>Type</h4>
        <h4 className='frequency'>Frequency</h4>
        <h4 className='date'>Date</h4>
        <h4 className='expected'>Expected</h4>
        <h4 className='actual'>Actual</h4>
        <h4 className='difference'>Difference</h4>
        <h4 className='notes'>Notes</h4>
      </span>
      {filteredIncomes && filteredIncomes.map(income =>
          <div key={income.id} className={hidden === true ? "income-row hidden" : "income-row"}>
            <IncomeRow incomes={income} transactions={transactions} />
            <button onClick={() => handleRemoveIncome(income)}>X</button>
          </div>
      )}
      {/* {incomes && incomes.filter(income => isDateBetween(income.date, dates.startDate, dates.endDate)).map(income => */}
      {/*     <div key={income.id} className={hidden === true ? "income-row hidden" : "income-row"}> */}
      {/*       <IncomeRow incomes={income} transactions={transactions} /> */}
      {/*       <button onClick={() => handleRemoveIncome(income)}>X</button> */}
      {/*     </div> */}
      {/*   )} */}
      <button onClick={handleNewIncome}>+</button>
    </section>
  )
}

export default IncomeComponent
