import { useState } from 'react'

import Register from './components/Register'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div><Register/></div>
  )
}

export default App
