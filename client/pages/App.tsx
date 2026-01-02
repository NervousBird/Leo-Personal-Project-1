import { Outlet } from "react-router"
import Home from './Home.tsx'
import Welcome from './Welcome.tsx'

function App() {
  // const [popup, setPopup] = useRef()

  return (
    <main>
      <Outlet />
    </main>
  )
}

export default App
