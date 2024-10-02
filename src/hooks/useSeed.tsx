import { useEffect, useState } from "react";
import { firebaseConfig } from "../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

export type itemType = {
	firestoreID: string;
	name: string;
	manufacturer: string;
	stock: string;
	comment: string;
};

export type CurrentStockType = itemType[];

export type SeedsContextType = {
	currentStock: CurrentStockType;
	addSeed: (newItem: itemType) => void;
	editSeed: (editedSeed: itemType) => void;
	deleteSeed: (seedToDelete: itemType) => void;
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);
const stockCollection = collection(dataBase, "seedsInventory");

// HOOK TO HANDLE SEEDS
export const useSeed = () => {
	const [currentStock, setCurrentStock] = useState<CurrentStockType>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// LISTEN FOR CHANGES IN THE DATABASE AND UPDATE THE STATE
	useEffect(()=> {
		setLoading(true);
		const unsubscribe = onSnapshot(stockCollection, (snapshot) => {
			const stockList = snapshot.docs.map((doc) => {
				return {
					firestoreID: doc.id,
					...doc.data()
				} as itemType;
			})

			setCurrentStock(stockList);
			setLoading(false);								
		}, (error) => {
			setError(error.message);
			setLoading(false);
		})
	
		return ()=> unsubscribe()
	},[]);	

	// ADD SEED TO DATABASE
	const addSeed = async (newItem: itemType) => {
		try {
				setLoading(true);
				const newSeedRef = await addDoc(stockCollection, newItem);
				console.log("New seed added with ID: ", newSeedRef.id);
				setLoading(false);
			} catch (error) {
				if(error instanceof Error) {
					setError(error.message);
					console.log("Error adding seed", error.message);
				}
			}	finally {
				setLoading(false);
			}
		};

	// EDIT SEED IN DATABASE
	const editSeed = async (editedSeed: itemType) => {
		const { firestoreID, ...seedData } = editedSeed; 
		// IF THE FIRESTOREID IS MISSING, THROW AN ERROR
		if (!firestoreID) {
			throw new Error("No Firestore ID provided for the seed to edit.");
		}

		try {
			setLoading(true);
			const editedSeedRef = doc(dataBase, "seedsInventory", `${firestoreID}`);
			// REMOVE FIRESTOREID FROM THE OBJECT BEFORE UPDATING THE DATABASE
			await setDoc(editedSeedRef, seedData);
			console.log("Edited seed with ID: ", firestoreID);	
		} catch (error) {
			if(error instanceof Error)	{
				setError(error.message);
			}
		} finally {
			setLoading(false);
		};
	};

	// DELETE SEED FROM DATABASE
	const deleteSeed = async (seedToDelete: itemType) => {
		try {
			setLoading(true);			
			const seedToDeleteRef = doc(dataBase, "seedsInventory", `${seedToDelete.firestoreID}`);
			await deleteDoc(seedToDeleteRef);
			console.log("Seed deleted with ID: ", seedToDeleteRef.id);
		} catch (error) {
			if(error instanceof Error)	{
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}	
	};

	return { currentStock, addSeed, editSeed, deleteSeed, loading, error };
};

export default useSeed;
