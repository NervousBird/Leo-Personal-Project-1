import { Link } from 'react-router'

function Welcome() {

  return (
    <section className="welcome-container">

      <div className="title-container">
        <h1>Finances</h1>
        <span>By Leo Walton</span>
        <p>Track your finances and create goals, keep track of it all, what else could you want?<br /> Probably more, you greedy bastard.</p>
      </div>
      <div className="button-container">
        <Link to="/home" viewTransition >
          <svg>
            <circle className="circle-1" />
            <circle className="circle-2" />
            <circle className="circle-3" />
            <circle className="circle-4" />
            <text></text>
          </svg>
        </Link>
        <span>To Finances!</span>
      </div>
    </section>
  )
}

export default Welcome
