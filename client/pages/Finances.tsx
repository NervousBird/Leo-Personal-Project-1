import IncomeComponent from '../components/IncomeComponent.tsx'
import ExpenseComponent from '../components/ExpenseComponent.tsx'
import TransactionComponent from '../components/TransactionComponent.tsx'
import SavingsComponent from '../components/SavingsComponent.tsx'
import ReccuringForm from '../components/RecurringForm.tsx'
import { Expense } from '../../models/expenses.ts'
import { Income } from '../../models/incomes.ts'
import { Transaction } from '../../models/transactions.ts'
import { Savings } from '../../models/savings.ts'

interface Props {
  incomes: Income[]
  expenses: Expense[]
  transactions: Transaction[]
  savings: Savings[]
  dates: {
    startDate: string
    endDate: string
  }
}

function Finances({ incomes, expenses, transactions, savings, dates }: Props) {

  return (
    <section className='finances'>

      <section>
        <ReccuringForm />
      </section>

       {dates &&
        <section>
          {incomes && transactions &&
            <IncomeComponent incomes={incomes} transactions={transactions} dates={dates}/>
          }
          {expenses && transactions &&
            <ExpenseComponent expenses={expenses} transactions={transactions} dates={dates} />
          }
          {savings && transactions &&
            <SavingsComponent savings={savings} transactions={transactions} dates={dates} />
          }
          {transactions &&
            <TransactionComponent transactions={transactions} dates={dates} />
          }
        </section>
      }

    </section>
  )
}

export default Finances
