import { useState, FormEvent, ChangeEvent } from "react"
import { Expense } from "../../models/expenses.ts"

interface Props {
  onHandleSubmit: (e: FormEvent<HTMLFormElement>) => void
  year: string
  expenses: Expense[]
}

function TargetComponent({ onHandleSubmit, expenses, year }: Props) {
  const [targets, setTargets] = useState({ monthly: "0.00", yearly: "0.00" })
  const [savings, setSavings] = useState(expenses.filter((expense) => expense.type.toLowerCase() === "savings"))
  // const [year, setYear] = useState("2026")
  const [currentAmount, setCurrentAmount] = useState<string>()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTargets((prev) => ({...prev, [name]: value }))
  }

  const handleChangeCurrent = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCurrentAmount(value)
  }

	return (
		<section className="targets-component" >
			<h3 className="title">Targets!</h3>
      <h3 className="year">{year.slice(0, 4)}</h3>
			<form onSubmit={onHandleSubmit}>
        <div className="savings-selection-container">
          <select>
            {savings.map((saving) => (
              <option>{saving.name}</option>
            ))}
          </select>
        </div>
        <div className="titles">	
          <h4>Monthly:</h4>
          <h4>Yearly:</h4>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="monthly">Target:</label>
            <input
              id="monthly"
              name="monthly"
              value={targets.monthly}
              onChange={handleChange}
              placeholder="monthly"
            />
          </div>
          <div className="input">
            <label htmlFor="yearly">Target:</label>
            <input
              id="yearly"
              name="yearly"
              value={targets.yearly}
              onChange={handleChange}
              placeholder="yearly"
            />
          </div>
        </div>
        <button type="submit">Submit</button>
        <div>
          <label htmlFor="currentAmount">Current Amount:</label>
          <input
            id="currentAmount"
            name="currentAmount"
            value={currentAmount}
            onChange={handleChangeCurrent}
            placeholder="Current Amount"
          />
        </div>
        <button type="submit">Submit</button>
			</form>
		</section>
	)
}

export default TargetComponent
