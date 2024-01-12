import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const inititalstate = 'greetings';
function App() {
  
  const [state, setState] = useState(inititalstate)


  return (
    <>
      <h1>{state}</h1>
    </>
  )
}

export default App
