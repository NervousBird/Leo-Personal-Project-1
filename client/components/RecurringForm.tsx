import { ChangeEvent, FormEvent, useState } from "react"
import { useExpenses } from "../hooks/useExpenses.ts"
import { useIncomes } from "../hooks/useIncomes.ts"
import { useSavings, useSaving } from "../hooks/useSavings.ts"
import { getDatesToAdd } from "../util/date-utils.ts"
import { IncomeObject } from "../../models/incomes.ts"
import { SavingsBulkObject } from "../../models/savings.ts"

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
  const { data: savings, isPending: savingsPending, isError: savingsError } = useSavings()
  const { data: saving, isPending: savingPending, isError: savingError } = useSaving()
  const useIncome = useIncomes()
  const useExpense = useExpenses()
  const useSavingsHooks = useSavings()
  const [formData, setFormData] = useState(defaultForm)
  const [formWarning, setFormWarning] = useState({ state: false, message: '' })
  const [hidden, setHidden] = useState(true)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if(formData.category === '') {
      return setFormWarning({ state: true, message: 'Category must have a valid input!' })
    }
    if(formData.type === '' && formData.category !== "Saving") {
      return setFormWarning({ state: true, message: 'Type must have a valid input!' })
    }
    if(formData.frequency === '') {
      return setFormWarning({ state: true, message: 'Frequency must have a valid input!' })
    }
    if(formData.startDate === '') {
      return setFormWarning({ state: true, message: 'Start Date must have a valid input!' })
    }

    const datesArray = getDatesToAdd({ startDate: formData.startDate, endDate: formData.endDate}, formData.frequency)
    let filteredDates = [] as string[]

    if(datesArray?.length > 0) {
      if(formData.category === 'Income') {
        const filteredIncomes = incomes?.filter(income => {
          income.type === formData.type ? true : false
        }).map(income => income.date)

        filteredDates = datesArray.filter(date => !filteredIncomes?.includes(date))
      }

      if(formData.category === 'Expense') {
        const filteredExpenses = expenses?.filter(expense => {
          expense.type === formData.type ? true : false
        }).map(expense => expense.date)

        filteredDates = datesArray.filter(date => !filteredExpenses?.includes(date))
      }

      if(formData.category === "Saving") {
        const filteredSavings = savings?.filter(saving => {
          saving.name === formData.name ? true : false
        }).map(saving => saving.startingDate)

        filteredDates = datesArray.filter(date => !filteredSavings?.includes(date))
      }
    }

    // Create non existing database entries, datesArray contains the DATES they should be posted
    if(filteredDates.length !== 0) {
      const dataArray = filteredDates.map(date => {
        if(formData.category === "Saving") {
          return {
            name: formData.name,
            frequency: formData.frequency,
            starting_date: date,
            amount: Number(formData.expected.replace("$", "")).toFixed(2),
            notes: '',
          }
        } else {
          return {
            name: formData.name,
            type: formData.type,
            frequency: formData.frequency,
            date: date,
            expected: Number(formData.expected.replace("$", "")).toFixed(2),
            notes: '',
          }
        }
      }) as IncomeObject[]
      addToDatabase(dataArray)
    }

    // Wipe form/show success!
    setFormData(defaultForm)
    setFormWarning({ state: false, message: '' })
  }

  const addToDatabase = async (data: IncomeObject[] | SavingsBulkObject[]) => {
    const typeIncome = data as IncomeObject[]
    const typeSavings = data as SavingsBulkObject[]
    switch(formData.category) {
      case 'Income':
         try {
            await useIncome.addBulk.mutateAsync(typeIncome)
        } catch (error) {
          console.error('Error adding income:', error)
        }
        break
      case 'Expense':
          try {
            await useExpense.addBulk.mutateAsync(typeIncome)
        } catch (error) {
          console.error('Error adding expense:', error)
        }
      case 'Saving':
        try {
          await useSavingsHooks.addBulk.mutateAsync(typeSavings)
        } catch (error) {
          console.error('Error adding saving:', error)
        }
        break
      default:
        console.log('error')
        break
    }
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
                <option value="Saving">Saving</option>
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
                disabled={formData.category === "Saving"}
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
