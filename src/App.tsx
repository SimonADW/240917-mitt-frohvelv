import './App.css'
import { useState } from 'react'
import Hero from './components/hero/Hero'
import AddAndSearch from './components/addAndSearch/AddAndSearch'
import SeedList from './components/seedList/SeedList'
import RegisterSeed from './components/registerSeed/RegisterSeed'
import seedInventory from './assets/data/seedsData'

export type CurrentStockType = {  
  id: number
  name: string
  producer: string
  stock: string
}[]

function App() {
  const [currentStock, setCurrentStock] = useState<CurrentStockType>([...seedInventory])
  const [formOpen, setFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <Hero />
      <main>
        <AddAndSearch setFormOpen={setFormOpen} />
        <SeedList currentStock={currentStock} setCurrentStock={setCurrentStock} setFormOpen={setFormOpen} setIsEditing={setIsEditing}/>
        {formOpen && <RegisterSeed currentStock={currentStock} setCurrentStock={setCurrentStock} setFormOpen={setFormOpen} isEditing={isEditing}/>}
      </main>
      <footer>2024 &copy; Simon Winter</footer>
    </>
  )
}

export default App
