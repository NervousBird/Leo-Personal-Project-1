import { Outlet } from "react-router"
import { useEffect, useState } from 'react'
import { useUserData } from "../hooks/useUserData.ts"
import { changeColorStyles } from '../util/colour-scheme-utils.ts'

function App() {
  const { data, isPending, isError } = useUserData()
  const [trigger, setTrigger] = useState(false)

  const updateUserScheme = () => {
    if(data) {
      const bordersScheme = JSON.parse(data.borders)
      const colorScheme = JSON.parse(data.colors)
      const colorKeys = Object.keys(colorScheme)
      const colorValues = Object.values(colorScheme)

      for(let i = 0; i < colorKeys.length; i++) {
        changeColorStyles(colorKeys[i], colorValues[i])
      }

      document.documentElement.style.setProperty('--border-radius', bordersScheme.border)
      document.documentElement.style.setProperty('--button-radius', bordersScheme.button)
    }
  }

  useEffect(() => {
    if(trigger) { updateUserScheme() }
  },[trigger])

  if(isError) return <div>Error Loading User Preferences...</div>

  if(isPending) return <div>Loading User Preferences... </div>

  if(data) {
    if(!trigger) {
      setTrigger(true)
    }
  }
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default App
