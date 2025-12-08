import { Transaction } from "../../models/transactions"
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
      console.error('Error adding income:', error)
    }
  }

  const handleRemoveTransaction = async (id: Transaction) => {
    await useTransaction.delete.mutateAsync(id)
  }

  const isDateBetween = (dateToCheck: string, startDate: string, endDate: string) => {
    const result = new Date(dateToCheck) >= new Date(startDate) && new Date(dateToCheck) <= new Date(endDate)
    return result
  }

  return (
    <section className="transaction-component">
      <h3>Transactions</h3>
      <span className='table-header'>
        <h4 className='name'>Name</h4>
        <h4 className='type'>Type</h4>
        <h4 className='date'>Date</h4>
        <h4 className='amount'>Amount</h4>
        <h4 className='notes'>Notes</h4>
      </span>
      {transactions && transactions.filter(transaction => isDateBetween(transaction.date, dates.startDate, dates.endDate)).map(transaction => 
        <div key={transaction.id} className='transaction-row'>
          <TransactionRow transactionData={transaction} dates={dates}/>
          <button onClick={() => handleRemoveTransaction(transaction)}>X</button>
        </div>
      )}
      <button onClick={handleNewTransaction}>+</button>
    </section>
  )
}

export default TransactionComponent