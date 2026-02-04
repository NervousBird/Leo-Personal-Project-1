import IncomeComponent from '../components/IncomeComponent.tsx'
import ExpenseComponent from '../components/ExpenseComponent.tsx'
import TransactionComponent from '../components/TransactionComponent.tsx'
import SavingsComponent from '../components/SavingsComponent.tsx'
import ReccuringForm from '../components/ReccuringForm.tsx'
import { Expense } from '../../models/expenses.ts'
import { Income } from '../../models/incomes.ts'
import { Transaction } from '../../models/transactions.ts'
import { Savings, Saving } from '../../models/savings.ts'
import { ChangeEvent } from 'react'

interface Props {
  incomes: Income[]
  expenses: Expense[]
  transactions: Transaction[]
  savings: Savings[]
  saving: Saving[]
  dates: {
    startDate: string
    endDate: string
  }
}

function Finances({ incomes, expenses, transactions, savings, saving, dates }: Props) {

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
          {savings && saving && transactions &&
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
