import { useState } from 'react'

interface Props {
  info: {
    largestIncome: {
      nameMonth: string,
      expectedMonth: string,
      nameYear: string,
      expectedYear: string,
    },
    largestExpense: {
      nameMonth: string,
      expectedMonth: string,
      nameYear: string,
      expectedYear: string,
    },
    largestSaving: {
      nameMonth: string,
      expectedMonth: string,
      nameYear: string,
      expectedYear: string,
    },
  }
}

function SummarySummaries({ info }: Props) {
  const [hidden, setHidden] = useState(false)

  return (
    <section className="summary-finances-table">
      <h3>Finance  Summaries</h3>
      <button className="titles" onClick={() => setHidden(!hidden)}>
        {hidden && <i className="bi bi-caret-up-fill" />}
        {!hidden && <i className="bi bi-caret-down-fill" />}
      </button>
      <div className={hidden ? "finances-summary-container hidden" : "finances-summary-container"}>
        <div className="summary-goals-groups">
          <div className="summary-goal-group">
            <p>Largest income</p>
            {info.largestIncome && <p>{info.largestIncome.nameMonth}:</p>}
            {info.largestIncome && <p>${info.largestIncome.expectedMonth}</p>}
          </div>
          <div className="summary-goal-group">
            <p>Largest income</p>
            {info.largestIncome && <p>{info.largestIncome.nameYear}:</p>}
            {info.largestIncome && <p>${info.largestIncome.expectedYear}</p>}
          </div>
          <div className="summary-goal-group">
            <p>Largest expense</p>
            {info.largestExpense && <p>{info.largestExpense.nameMonth}:</p>}
            {info.largestExpense && <p>${info.largestExpense.expectedMonth}</p>}
          </div>
          <div className="summary-goal-group">
            <p>Largest expense</p>
            {info.largestExpense && <p>{info.largestExpense.nameYear}:</p>}
            {info.largestExpense && <p>${info.largestExpense.expectedYear}</p>}
          </div>
          <div className="summary-goal-group">
            <p>Largest saving</p>
            {info.largestSaving && <p>{info.largestSaving.nameMonth}:</p>}
            {info.largestSaving && <p>${info.largestSaving.expectedMonth}</p>}
          </div>
          <div className="summary-goal-group">
            <p>Largest saving</p>
            {info.largestSaving && <p>{info.largestSaving.nameYear}:</p>}
            {info.largestSaving && <p>${info.largestSaving.expectedYear}</p>}
          </div>
          <p>Pie chart for spending (based on expense type and saving name)</p>
        </div>
      </div>
    </section>
  )
}

export default SummarySummaries
