import { useEffect, useState } from "react";
import seedInventory from "../assets/data/seedsData";
import { addSeedToDatabase, deleteSeedFromDatabase, editSeedInDatabase, getStockFromDatabase } from "../firebase/firebaseFunction";

export type itemType = {
	id: number;
	name: string;
	manufacturer: string;
	stock: string;
	comment: string;
	firestoreID?: string;
	serverTimestamp?: string;
};

export type CurrentStockType = itemType[];

export type SeedsContextType = {
	currentStock: CurrentStockType;
	addSeed: (newItem: itemType) => void;
	editSeed: (editedSeed: itemType) => void;
	deleteSeed: (seedToDelete: itemType) => void;
};

export const useSeed = () => {
	const [currentStock, setCurrentStock] = useState<CurrentStockType>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(()=> {
		const fetchStock = async () => {
			try {
				setLoading(true);
				const stockList = await getStockFromDatabase();
				setCurrentStock(stockList);	
			} catch (error) {
				setError(error.message);	
				console.log("Error fetching data;", error.message);
			} finally {
				setLoading(false);
			}
		}

		fetchStock();
	},[])
	
	
	const addSeed = async (newItem: itemType) => {
		try {
			setLoading(true);
			await addSeedToDatabase(newItem);
			setCurrentStock((prev) => [...prev, newItem]);
		} catch (error) {
			setError(error.message);
			console.log("Error adding seed", error.message);
		}	finally {
			setLoading(false);
		}
	};

	const editSeed = async (editedSeed: itemType) => {
		try {
			setLoading(true);
			await editSeedInDatabase(editedSeed);			
			setCurrentStock((prev) =>
				prev.map((seed) => (seed.id === editedSeed.id ? editedSeed : seed))
			);
		} catch {
			setError("Error editing seed");
		} finally {
			setLoading(false);
		};
	};

	const deleteSeed = async (seedToDelete: itemType) => {
		try {
			setLoading(true);			
			await deleteSeedFromDatabase(seedToDelete);
			setCurrentStock((prev) =>
				prev.filter((seed) => seed.id !== seedToDelete.id)
			);
		} catch {
			setError("Error deleting seed");
		} finally {
			setLoading(false);
		}	
	};

	return { currentStock, addSeed, editSeed, deleteSeed, loading, error };
};

export default useSeed;
