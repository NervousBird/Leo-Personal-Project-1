import { useState, FormEvent, ChangeEvent } from "react"

interface Props {
  onHandleSubmit: (e: FormEvent<HTMLFormElement>) => void 
}

function TargetComponent({ onHandleSubmit }: Props) {
  const [targets, setTargets] = useState({ monthly: "0.00", yearly: "0.00" })
  const [warning, setWarning] = useState()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTargets((prev) => ({...prev, [name]: value }))
    setWarning(true)
  }

	return (
		<section className="targets-component" >
			<h3 className="title">Targets!</h3>
			<div className="titles">	
				<h4>Monthly:</h4>
				<h4>Yearly:</h4>
			</div>
			<form onSubmit={onHandleSubmit}>
        <div className="input-container">
          <div className="input">
            <label htmlFor="monthly">Target:</label>
            <input 
              name="monthly"
              value={targets.monthly}
              onChange={handleChange}
              placeholder="monthly"
            />
          </div>
          <div className="input">
            <label htmlFor="yearly">Target:</label>
            <input 
              name="yearly" 
              value={targets.yearly}
              onChange={handleChange}
              placeholder="yearly"
            />
          </div>
        </div>
        <button type="submit">Submit</button>
			</form>
		</section>
	)
}

export default TargetComponent
