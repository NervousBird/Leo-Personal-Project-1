import { Outlet } from "react-router"
import Home from './Home.tsx'
import Welcome from './Welcome.tsx'
import { useUserData } from "../hooks/useUserData.ts"

function App() {
  const { data, isPending, isError } = useUserData()

  if(isError) return <div>Error Loading User Preferences...</div>

  if(isPending) return <div>Loading User Preferences... </div>

  return (
    <main>
      {data && <div>Hello {data}</div>}
      <Outlet />
    </main>
  )
}

export default App
