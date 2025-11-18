import { Transaction } from "../../models/transactions"
import { useTransactions } from "../hooks/useTransactions"
import TransactionRow from "./TransactionRow"
interface Props {
  startDate: string
  endDate: string
}

function TransactionComponent(dates: Props) {
  const { data: transactions } = useTransactions()
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
    <div>
      <section className="transaction-component">
        <span className='table-header'>
          <h4>Name</h4>
          <h4>Type</h4>
          <h4>Date</h4>
          <h4>Amount</h4>
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
    </div>
  )
}

export default TransactionComponent