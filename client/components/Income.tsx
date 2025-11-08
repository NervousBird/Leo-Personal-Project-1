import { useState } from "react"

function Income() {
  const [data, setData] = useState({
    id: 1,
    name: '',
    type: '',
    frequency: '',
    date: '',
    expected: '',
    actual: '',
    notes: '',
  })

  return (
    <div className="income_component">
      <form>
        <input placeholder="name"></input>
        <input placeholder="type: work ect"></input>
        <select id='frequency'>
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
          <option value="fornightly">fortnightly</option>
          <option value="monthly">monthly</option>
          <option value="bi-monthly">fortmonthly</option>
          <option value="bi-yearly">bi-yearly</option>
          <option value="yearly">yearly</option>
        </select>
        <input placeholder="starting date"></input>
        <input placeholder="expected"></input>
        {/* <input placeholder="actual (based on transactions)"></input> */}
        <span> actual </span>
        <span> difference </span>
        <input className="notes" placeholder="notes"></input>
        {/* <button>X</button> */}
      </form>
    </div>
  )
}

export default Income