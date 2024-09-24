import { createContext, ReactNode } from "react"
import useSeed from "../hooks/useSeed";
import { itemType } from "../hooks/useSeed";

export type SeedsContextType = {
	currentStock: CurrentStockType;
	addSeed: (newItem: itemType) => void;
	editSeed: (editedSeed: itemType) => void;
	deleteSeed: (seedToDelete: itemType) => void;
}
export const SeedsContext = createContext<SeedsContextType>();

type SeedsProviderProps = {
	children: ReactNode
}

export type CurrentStockType = itemType[];

const SeedsProvider = ({ children }: SeedsProviderProps) => {
	const { currentStock, addSeed, editSeed, deleteSeed } = useSeed();

  return (
	<SeedsContext.Provider value={{currentStock, addSeed, editSeed, deleteSeed }}>
		{children}
	</SeedsContext.Provider>
  )
}

export default SeedsProvider