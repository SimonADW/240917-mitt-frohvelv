import { useState } from "react"
import seedInventory from "../assets/data/seedsData"

export type itemType = {
	id: number
	name: string
	manufacturer: string
	stock: string
	comment: string
}
export type CurrentStockType = itemType[]

export type SeedsContextType = {
	currentStock: CurrentStockType;
	addSeed: (newItem: itemType) => void;
	editSeed: (editedSeed: itemType) => void;
	deleteSeed: (seedToDelete: itemType) => void;
  };

export const useSeed = () => {
	const [currentStock, setCurrentStock] = useState<CurrentStockType>([...seedInventory])

	const addSeed = (newItem: itemType)=> {
		console.log("Seed added", currentStock);
		setCurrentStock((prev)=> [...prev, newItem])
	}

	const editSeed = (editedSeed: itemType)=> {
		setCurrentStock((prev)=> prev.map((seed)=> seed.id === editedSeed.id ? editedSeed : seed))
	}

	const deleteSeed = (seedToDelete: itemType)=> {		
		setCurrentStock((prev)=> prev.filter((seed)=> seed.id !== seedToDelete.id))
	}

  return { currentStock, addSeed, editSeed, deleteSeed }
}


export default useSeed