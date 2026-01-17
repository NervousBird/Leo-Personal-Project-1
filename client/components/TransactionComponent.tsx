import { Transaction } from "../../models/transactions"
import { useState, useEffect } from "react"
import { useTransactions } from "../hooks/useTransactions"
import TransactionRow from "./TransactionRow"

interface Props {
  transactions: Transaction[]
  dates: {
    startDate: string
    endDate: string
  }
}

function TransactionComponent({ transactions, dates }: Props) {
  const useTransaction = useTransactions()
  const [hidden, setHidden] = useState(false)
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [searchString, setSearchString] = useState({ search: "" })


  const handleNewTransaction = async () => {
    try {
      await useTransaction.add.mutateAsync({
        name: '',
        type: '',
        date: `${dates.startDate}`,
        amount: '0.00',
        notes: '',
      })
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const handleRemoveTransaction = async (id: Transaction) => {
    await useTransaction.delete.mutateAsync(id)
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

  const filterTransaction = () => {
    let filter = transactions.filter(transaction => isDateBetween(transaction.date, dates.startDate, dates.endDate))
    if(searchString.search !== "") {
      filter = filter.filter(transaction => transaction.name.toLowerCase().includes(searchString.search.toLowerCase()))
    }
    setFilteredTransactions(filter)
  }

  useEffect(() => {
    filterTransaction()
  }, [transactions, dates, searchString])


  return (
    <section className="transaction-component">
      <div className="topbar">
        <button className="title" onClick={handleHidden}>
          <h3>Transactions</h3>
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
        <h4 className='date'>Date</h4>
        <h4 className='amount'>Amount</h4>
        <h4 className='notes'>Notes</h4>
      </span>
      {filteredTransactions && filteredTransactions.map(transaction => 
        <div key={transaction.id} className={hidden === true ? 'transaction-row hidden' : 'transaction-row'}>
          <TransactionRow transactionData={transaction} dates={dates}/>
          <button onClick={() => handleRemoveTransaction(transaction)}>X</button>
        </div>
      )}
      <button onClick={handleNewTransaction}>+</button>
    </section>
  )
}

export default TransactionComponent
