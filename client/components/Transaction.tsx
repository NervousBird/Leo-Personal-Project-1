function Transaction() {
  return (
    <>
      <form>
        <input placeholder="name"></input>
        <input placeholder="type: income/expense"></input>
        <input placeholder="category: salary/bill/etc"></input>
        <input placeholder="date"></input>
        <input placeholder="amount"></input>
        <input placeholder="notes"></input>
      </form>
    </>
  )
}

export default Transaction