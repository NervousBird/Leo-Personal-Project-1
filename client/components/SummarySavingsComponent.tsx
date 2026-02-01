import { useEffect, useState, ChangeEvent } from 'react'
import { Savings, Saving } from '../../models/savings.ts'
import { Transaction } from '../../models/transactions'
import { getMonthAsWord } from '../util/date-utils'
import { isDateBetween } from "../util/date-utils"

interface Props {
  savings: Savings[]
  saving: Saving[]
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
  summaryHidden:boolean
}

function SummarySavingsComponent({ savings, saving, transactions, dates, summaryHidden }: Props) {
  const [filter, setFilter] = useState("")
  const [actual, setActual] = useState({ monthly: "0.00", yearly: "0.00" })
  const [savingsType, setSavingsType] = useState([...new Set(savings.map(saving => saving.name))])

  const countActualAmount = ( savingType: string, dateRange: { startDate: string, endDate: string } ): string => {
    const savingRange = savings.filter(saving => saving.name === savingType && isDateBetween(saving.startingDate, dateRange.startDate, dateRange.endDate))
    const savingAmounts = savingRange.map(saving => saving.amount.replace("$", ""))
    const stringValue = savingAmounts.reduce((a, b) => Number(a) + Number(b), 0)
    return stringValue.toFixed(2)
  }

  const updateTotal = (type: string) => {
    const currentYear = { startDate: `${new Date(dates.startDate).getFullYear()}-01-01`, endDate: `${new Date(dates.startDate).getFullYear()}-12-31` }
    const monthly = countActualAmount(type, dates)
    const yearly = countActualAmount(type, currentYear)
    setActual({ monthly: monthly, yearly: yearly})
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    updateTotal(value)
    setFilter(value)
  }

  useEffect(() => {
    setSavingsType([...new Set(savings.map(saving => saving.name))])
    updateTotal(filter)
  }, [savings])

  return (
    <div className={summaryHidden ? 'summaries-container hidden' : 'summaries-container'}>
      <div className="savings-selection-container">
        <h4>Saving:</h4>
        <select key={filter} value={filter} onChange={handleChange}>
          <option value="empty">none</option>
          {savingsType.map((name, idx) => (
            <option key={idx} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <div className="summary-group">
        <p>
          Currently on track for <b>{getMonthAsWord(dates)[0]}</b> to make:
        </p>
        <p key={actual.monthly}>{`$${actual.monthly}`}</p>
      </div>
      <div className="summary-group">
        <p>
          Currently on track for <b>{dates.startDate.slice(0, 4)}</b> to make:
        </p>
        <p key={actual.yearly}>{`$${actual.yearly}`}</p>
      </div>
    </div>
  )
}

export default SummarySavingsComponent
