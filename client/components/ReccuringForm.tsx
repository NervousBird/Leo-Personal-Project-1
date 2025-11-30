import { ChangeEvent, FormEvent, useState } from "react"
import { useExpenses } from "../hooks/useExpenses"
import { useIncomes } from "../hooks/useIncomes"
import { getDatesToAdd } from "../util/date-utils"
import { IncomeObject } from "../../models/incomes"

const defaultForm = {
  category: 'Income',
  name: '',
  type: '',
  frequency: 'weekly',
  startDate: '',
  endDate: '',
  expected: '$0.00',
}

const frequencyArray = [
  'daily','weekly','fortnightly','monthly','fortmonthly','quarterly','bi-annually','annually',
]

function ReccuringForm() {
  const { data: expenses, isPending: expensesPending, isError: expensesError } = useExpenses()
  const { data: incomes, isPending: incomesPending, isError: incomesError } = useIncomes()
  const useIncome = useIncomes()
  const useExpense = useExpenses()
  const [formData, setFormData] = useState(defaultForm)
  const [formWarning, setFormWarning] = useState({ state: false, message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  
    console.log('working')
    // Check form is valid (REQUIRES: category, type, frequency, startDate)  
    if(formData.category === '') {
      return setFormWarning({ state: true, message: 'Category must have a valid input!' })
    }
    if(formData.type === '') {
      return setFormWarning({ state: true, message: 'Type must have a valid input!' })
    }
    if(formData.frequency === '') {
      return setFormWarning({ state: true, message: 'Frequency must have a valid input!' })
    }
    if(formData.startDate === '') {
      return setFormWarning({ state: true, message: 'Start Date must have a valid input!' })
    }
    // Calculate necessary future dates based on frequency, startDate, endDate
    const datesArray = getDatesToAdd({ startDate: formData.startDate, endDate: formData.endDate}, formData.frequency)
    let filteredDates = [] as string[]

    if(datesArray?.length > 0) {
      // Check if they exist already (if they do, maybe mutate them?)
      if(formData.category === 'Income') {
        const filteredIncomes = incomes?.filter(income => {
          income.type === formData.type ? true : false
        }).map(income => income.date)

        filteredDates = datesArray.filter(date => !filteredIncomes?.includes(date))
      }
      // change for expense
      if(formData.category === 'Expense') {
        const filteredExpenses = expenses?.filter(expense => {
          expense.type === formData.type ? true : false
        }).map(expense => expense.date)

        filteredDates = datesArray.filter(date => !filteredExpenses?.includes(date))
      }
    }

    // Create non existing database entries, datesArray contains the DATES they should be posted
    if(filteredDates.length !== 0) {
      const dataArray = filteredDates.map(date => {
        return {
          name: formData.name,
          type: formData.type,
          frequency: formData.frequency,
          date: date,
          expected: formData.expected.replace("$", ""),
          notes: '',
        }
      }) as IncomeObject[]
      addToDatabase(dataArray)      
    }

    // Wipe form/show success!
    setFormData(defaultForm)
    setFormWarning({ state: false, message: '' })
  }

  const addToDatabase = async (data: IncomeObject[]) => {
    switch(formData.category) {
      case 'Income':
         try {
            await useIncome.addBulk.mutateAsync(data)
        } catch (error) {
          console.error('Error adding income:', error)
        }
        break
      case 'Expense':
            try {
            await useExpense.addBulk.mutateAsync(data)
        } catch (error) {
          console.error('Error adding expense:', error)
        }
        break
      default:
        console.log('error')
        break
    }
    console.log('added')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    switch(name) {
      case 'expected':
        setFormData((prev) => ({...prev, [name]: value.replace('$', '')}))
        break
      default:
        setFormData((prev) => ({...prev, [name]: value}))
        break
    }
  }
  
  return (
    <div className="recurringForm-container">
      {incomesPending && expensesPending && <p>Loading...</p>}
      {incomesError && expensesError && <p>Error loading...</p>}
      {formWarning.state && <div><p>{formWarning.message}</p></div>}
      {incomes && expenses &&
        <form onSubmit={handleSubmit}>
          <h3>Add yearly finance</h3>
          <section>
            <span>
              <label htmlFor="category">Category</label>
              <input 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </span>
            <span>
              <label htmlFor="name">Name</label>
              <input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </span>
            <span>
              <label htmlFor="type">Type</label>
              <input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </span>
            <span>
              <label htmlFor="frequency">Frequency</label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}>
                  {frequencyArray.map((item, idx) => <option key={idx} value={item}>{item}</option>)}
                </select>
            </span>
            <span>
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                type="date"
              />
            </span>
            <span>
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                type="date"
              />
            </span>
            <span>
              <label htmlFor="expected">Expected</label>
              <input
                id="expected"
                name="expected"
                value={formData.expected}
                onChange={handleChange}
              />
            </span>
          </section>
          <span className="button-container">
            <button type="submit">Add to Tables</button>
          </span>
        </form>
      }
    </div>
  )
}

export default ReccuringForm