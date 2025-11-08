import { ChangeEvent, useState } from "react"
import { Income } from "../../models/incomes"


function IncomeRow({id, name, type, frequency, date, expected, notes}: Income) {
  const [data, setData] = useState({
    id,
    name,
    type,
    frequency,
    date,
    expected,
    notes,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setData((prev) => ({...prev, [name]: value}))
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    
  }

  return (
    <div className="income_component">
      <form onSubmit={handleSubmit}>
        <input
          className="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="name"
        />
        <input
          className="type"
          name="type"
          value={data.type}
          onChange={handleChange}
          placeholder="type: work ect" 
        />
        <select className="frequency" id='frequency' name="frequency" value={data.frequency} onChange={handleChange}>
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
          <option value="fornightly">fortnightly</option>
          <option value="monthly">monthly</option>
          <option value="bi-monthly">fortmonthly</option>
          <option value="bi-yearly">bi-yearly</option>
          <option value="yearly">yearly</option>
        </select>
        <input 
          className="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          placeholder="starting date"
        />
        <input
          className="expected"
          name="expected"
          value={data.expected}
          onChange={handleChange}
          // type="number"
          placeholder="expected"
        />
        <span> actual </span>
        <span> difference </span>
        <input
          className="notes"
          name="notes"
          value={data.notes}
          onChange={handleChange}
          placeholder="notes"
        />
      </form>
    </div>
  )
}

export default IncomeRow