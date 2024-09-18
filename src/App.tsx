import './App.css'
import Hero from './components/hero/Hero'
import AddAndSearch from './components/addAndSearch/AddAndSearch'
import SeedList from './components/seedList/SeedList'
import RegisterSeed from './components/registerSeed/RegisterSeed'

import { useState } from 'react'

export type CurrentStockType = {  
  id: number
  name: string
  producer: string
  stock: number
}[]

export type setFormType = {
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function App() {
  const [currentStock, setCurrentStock] = useState<CurrentStockType>([{ id: 1, name: 'Spinat', producer: 'Nordic Garden', stock: 10 }])
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <Hero />
      <main>
        <AddAndSearch setFormOpen={setFormOpen} />
        <SeedList currentStock={currentStock} />
        {formOpen && <RegisterSeed currentStock={currentStock} setCurrentStock={setCurrentStock} setFormOpen={setFormOpen}/>}
      </main>
      <footer>2024 &copy; Simon Winter</footer>
    </>
  )
}

export default App
