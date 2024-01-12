import { useEffect, useState } from 'react'
import './App.css'
import AddDeveloperForm from './components/AddDeveloperForm'
import Gallery from './components/Gallery'
import { Salty } from './interfaces'
import { addNewSalty, getSalties } from './api'

function App() {
  const [salties, setSalties] = useState<Array<Salty>>([]);

  useEffect(() => {
    getSalties().then((response) => {
      console.log(response);
      setSalties(response);
    })
  }, [])

  const addNewDeveloper = async (salty: Partial<Salty>) => {
    const addedSalty = await addNewSalty(salty);
    console.log(addedSalty)
    setSalties([addedSalty, ...salties])
  }

  return (
    <>
      <AddDeveloperForm addNewDeveloper={addNewDeveloper} />
      <Gallery salties={salties} />
    </>
  )
}

export default App
