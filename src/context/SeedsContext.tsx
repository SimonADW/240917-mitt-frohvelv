import { createContext, ReactNode } from "react"
import useSeed from "../hooks/useSeed";
import { itemType } from "../hooks/useSeed";

export type SeedsContextType = {
	currentStock: CurrentStockType;
	addSeed: (newItem: itemType) => void;
	editSeed: (editedSeed: itemType) => void;
	deleteSeed: (seedToDelete: itemType) => void;
	loading: boolean;
}
export const SeedsContext = createContext<SeedsContextType>({
	currentStock: [], // Placeholder values 
	addSeed: () => {}, 
	editSeed: () => {}, 
	deleteSeed: () => {}, 
	loading: false,  
}
	
);

type SeedsProviderProps = {
	children: ReactNode
}

export type CurrentStockType = itemType[];

const SeedsProvider = ({ children }: SeedsProviderProps) => {
	const { currentStock, addSeed, editSeed, deleteSeed, loading } = useSeed();

  return (
	<SeedsContext.Provider value={{currentStock, addSeed, editSeed, deleteSeed, loading }}>
		{children}
	</SeedsContext.Provider>
  )
}

export default SeedsProvider