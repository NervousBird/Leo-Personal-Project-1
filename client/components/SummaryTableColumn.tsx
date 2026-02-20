


interface Props {
  yearlyInfo: { expected: string, actual: string }
  yearlyDifference: string
  info: { expected: string, actual: string }
  difference: string
}

function SummaryTableColumn({ yearlyInfo, yearlyDifference, info, difference }: Props)  {

  return (
    <div className="summary-table">
      <div className="table">
        <h4>Expected</h4>
        <h4>Actual</h4>
        <h4>Difference</h4>
      </div>

      <div className="table yearly">
        <p>{`$${yearlyInfo.expected}`}</p>
        <p>{`$${yearlyInfo.actual}`}</p>
        {yearlyInfo &&
          <p style={Number(yearlyDifference) >= 0 ? { color: 'green' } : { color: 'red' }}>
            {`$${yearlyDifference}`}
          </p>
        }
      </div>

      <div className="table monthly">
        <p>{`$${info.expected}`}</p>
        <p>{`$${info.actual}`}</p>
        <section>
          <p style={Number(difference) >= 0 ? { color: 'green' } : { color: 'red' }}>
            {`$${difference}`}
          </p>
        </section>
      </div>
    </div>
  )
}

export default SummaryTableColumn
