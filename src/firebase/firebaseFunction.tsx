	import { initializeApp } from "firebase/app";
	import { firebaseConfig } from "./firebaseConfig";
	import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
	import { itemType } from "../hooks/useSeed";

	const app = initializeApp(firebaseConfig);

	const dataBase = getFirestore(app);
	const stockCollection = collection(dataBase, "seedsInventory");


export const getStockFromDatabase = async () => {
	const stockSnapshot = await getDocs(stockCollection);
	const stockList = stockSnapshot.docs.map((doc) => {
		return {firestoreID: doc.id, serverTimestamp: serverTimestamp(), ...doc.data()}
	});
	console.log(stockList);
	return stockList;
};

export const addSeedToDatabase = async (newSeed: itemType) => {
	const newSeedRef = await addDoc(stockCollection, newSeed);
	console.log("New seed added with ID: ", newSeedRef.id);
};

export const editSeedInDatabase = async (editedSeed: itemType) => {		
	const editedSeedRef = doc(dataBase, "seedsInventory", `${editedSeed.firestoreID}`);
	// Remove firestoreID from the object before updating the database
	const { firestoreID, ...seedData } = editedSeed; 
	// If the firestoreID is missing, throw an error
	if (!firestoreID) {
		throw new Error("No Firestore ID provided for the seed to edit.");
	  }

	await setDoc(editedSeedRef, seedData);
	console.log("Edited seed with ID: ", firestoreID);
};	

export const deleteSeedFromDatabase = async (seedToDelete: itemType) => {
	const seedToDeleteRef = doc(dataBase, "seedsInventory", `${seedToDelete.firestoreID}`);
	await deleteDoc(seedToDeleteRef);
	console.log("Seed deleted with ID: ", seedToDeleteRef.id);
}