import { useEffect, useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { useSaving } from "../hooks/useSavings.ts"
import { Savings, Saving } from '../../models/savings.ts'
import { DatesObject } from '../../models/types.ts'
import { Transaction } from '../../models/transactions'
import { getMonthAsWord, isDateBetween, getNextDate } from '../util/date-utils'

interface Props {
  savings: Savings[]
  saving: Saving[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
}

function SummarySavingsComponent({ savings, saving, transactions, dates }: Props) {
  const useSavings = useSaving()
  const [hidden, setHidden] = useState(false)
  const [filter, setFilter] = useState("")
  const [actual, setActual] = useState({ monthly: "0.00", yearly: "0.00" })
  const [target, setTarget] = useState({ id: NaN, name:  "", target: "0.00", targetDate: "" })
  const [savingsType, setSavingsType] = useState([...new Set(savings.map(saving => saving.name))])
  const [targetReached, setTargetReached] = useState("")

  const getCurrentYear = (): DatesObject => {
    const currentYear = { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date(dates.startDate).getFullYear()}-12-31` }
    return currentYear
  }

  const countActualAmount = ( savingType: string, dateRange: { startDate: string, endDate: string } ): string => {
    const savingRange = savings.filter(saving => saving.name === savingType && isDateBetween(saving.startingDate, dateRange.startDate, dateRange.endDate))
    savingRange.forEach(saving => {
      const endDate = getNextDate(saving.startingDate, saving.frequency)
      const transactionRange = transactions.filter(transaction => transaction.type === savingType && isDateBetween(transaction.date, saving.startingDate, endDate))
      if(transactionRange.length !== 0) {
        const transactionAmounts = transactionRange.map(transaction => transaction.amount.replace("$", ""))
        const transactionValue = transactionAmounts.reduce((a, b) => Number(a) + Number(b), 0)
        saving.amount = transactionValue.toFixed(2)
      }
    })
    const savingAmounts = savingRange.map(saving => saving.amount.replace("$", ""))
    const savingValue = savingAmounts.reduce((a, b) => Number(a) + Number(b), 0)

    return savingValue.toFixed(2)
  }

  const updateTotal = (type: string) => {
    const currentYear = getCurrentYear()
    const monthly = countActualAmount(type, { startDate: "2000-01-01",  endDate: dates.endDate }) // this  is a bad  work around
    const yearly = countActualAmount(type, currentYear)
    setActual({ monthly: monthly, yearly: yearly})
  }

  const updateTargets = (value: string) => {
    const filterSaving = saving.filter(saving => saving.name  === value)
    if(filterSaving.length > 0) {
      setTarget({ id: filterSaving[0].id, name: filterSaving[0].name, target: filterSaving[0].target, targetDate: filterSaving[0].targetDate })
    } else {
      setTarget({ id: NaN, name: "", target: "0.00", targetDate: "" })
    }
  }

  const updateTargetReached = () => {
    const currentYear = getCurrentYear()
    let count = 0
    let reachedData: Savings = { id: 0, name: "", amount: "", startingDate: "", frequency: "", notes: "" }
    const savingRange = savings.filter(saving => saving.name === filter && isDateBetween(saving.startingDate, currentYear.startDate, currentYear.endDate))
    for(let i = 0; i > savingRange.length; i++) {
      count += Number(savingRange[i].amount)
      if(count >= Number(target.target)) {
        reachedData = savingRange[i]
        break
      }
    }

    if(!reachedData.amount && savingRange.length > 0) {
      let date = savingRange[0].startingDate
      while(count < Number(target.target)) {
        const nextDate = getNextDate(date, savingRange[0].frequency)
        date = nextDate
        count += Number(savingRange[0].amount)
        reachedData = {...savingRange[0], startingDate: nextDate}
      }
    }
    setTargetReached(reachedData.startingDate)
    return reachedData.startingDate
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    updateTotal(value)
    setFilter(value)
    updateTargets(value)
  }

  const handleTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTarget((prev) => ({...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const targets  = await useSavings.byName.mutateAsync(filter)
    if(targets === undefined || targets === null) {
      await useSavings.add.mutateAsync({ name: filter, target: target.target, targetDate: target.targetDate })
    } else {
      await useSavings.update.mutateAsync(target)
    }
  }

  const handleDelete =  async (e: MouseEvent<HTMLButtonElement>) =>  {
    await useSavings.delete.mutateAsync(target)
  }

  useEffect(() => {
    setSavingsType([...new Set(savings.map(saving => saving.name))])
    updateTotal(filter)
    updateTargetReached()
    // Need to reload the saving from database
  }, [savings, dates, filter])

  return (
    <section className="summary-summaries-table">
      <h3>Targets</h3>
      <button className="titles" onClick={() => setHidden(!hidden)}>
        {hidden && <i className="bi bi-caret-up-fill" />}
        {!hidden && <i className="bi bi-caret-down-fill" />}
      </button>

      <div className={hidden ? 'summaries-container hidden' : 'summaries-container'}>
        <div className="savings-selection-container">
          <h4>Saving:</h4>
          <select key={filter} value={filter} onChange={handleChange}>
            <option value="empty">none</option>
            {savingsType.map((name, idx) => (
              <option key={idx} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="savings-targets-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="target">Amount:</label>
            <input name="target" value={target.target} onChange={handleTargetChange} />
            <label htmlFor="targetDate">By:</label>
            <input name="targetDate" type="date" value={target.targetDate} onChange={handleTargetChange} />
            <button type="submit">Save</button>
          </form>
          <button onClick={handleDelete}>Delete</button>
        </div>

        <div className="summary-groups">
          <div className="summary-group">
            <p>Will end <b>{getMonthAsWord(dates)[0]}</b> with:</p>
            <p key={actual.monthly}>{`$${actual.monthly}`}</p>
          </div>
          <div className="summary-group">
            <p>Will end <b>{dates.startDate.slice(0, 4)}</b> with:</p>
            <p key={actual.yearly}>{`$${actual.yearly}`}</p>
          </div>
        </div>
        <div className="summary-groups">
          <div className="summary-group">
            <p>When will goal be met:</p>
            <p>{targetReached}</p>
          </div>
          <div className="summary-group">
            <p>Goal met on time? *</p>
            {target.targetDate > targetReached && <p>Yes!!</p>}
            {!(target.targetDate > targetReached) && <p>Nope!!</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SummarySavingsComponent
