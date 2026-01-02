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
  const [hidden, setHidden] = useState()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  
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
          expected: Number(formData.expected.replace("$", "")).toFixed(2),
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

  const handleHidden = (e: FormEvent) => {
    e.preventDefault()
    setHidden(!hidden)
    console.log("test")
  }
  
  return (
    <div className="recurringForm-container">
      {incomesPending && expensesPending && <p>Loading...</p>}
      {incomesError && expensesError && <p>Error loading...</p>}

      {formWarning.state && <div className="warning-container"><p>{formWarning.message}</p></div>}
      
      {incomes && expenses &&
        <form onSubmit={handleSubmit}>
          <button className="form-button" onClick={handleHidden} type="button">
            <h3>Add Yearly Finance</h3>
            {hidden  && <i className="bi bi-caret-up-fill" />}
            {!hidden  && <i className="bi bi-caret-down-fill" />}
          </button>
          <section className={`recurringForm ${hidden === true ? "hidden" : ""}`}>
            <span>
              <label htmlFor="category">Category</label>
              <select
                className="category"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </span>
            <span>
              <label htmlFor="name">Name</label>
              <input
                className="name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </span>
            <span>
              <label htmlFor="type">Type</label>
              <input
                className="type"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </span>
            <span>
              <label htmlFor="frequency">Frequency</label>
              <select
                className="frequency"
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
                className="start-date"
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
                className="end-date"
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
                className="expected"
                id="expected"
                name="expected"
                value={formData.expected}
                onChange={handleChange}
              />
            </span>
            <span className="button-container">
              <button type="submit">Add to Tables</button>
            </span>
          </section>
        </form>
      }
    </div>
  )
}

export default ReccuringForm
