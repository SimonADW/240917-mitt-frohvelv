import "./App.css";
import { useContext, useEffect, useState } from "react";
import Hero from "./components/hero/Hero";
import AddAndSearch from "./components/addAndSearch/AddAndSearch";
import SeedList from "./components/seedList/SeedList";
import RegisterSeed from "./components/registerSeed/RegisterSeed";
import { SeedsContext } from "./context/SeedsContext";
import { itemType } from "./hooks/useSeed";
import LoadingWheel from "./components/loadingWheel/LoadingWheel";

function App() {
	const { currentStock, loading } = useContext(SeedsContext);
	const [formOpen, setFormOpen] = useState(false);
	const [listToDisplay, setListToDisplay] = useState(currentStock);
	const [seedToEdit, setSeedToEdit] = useState<itemType | null>(null);

	// Trigger re-render of list
	useEffect(() => {
		setListToDisplay(currentStock);
	}, [currentStock]);

	return (
		<>
			<Hero />
			<main>
				<AddAndSearch
					setFormOpen={setFormOpen}
					setListToDisplay={setListToDisplay}
				/>
				{loading ? (
					<LoadingWheel />
				) : (
					<SeedList
						setListToDisplay={setListToDisplay}
						listToDisplay={listToDisplay}
						setFormOpen={setFormOpen}
						setSeedToEdit={setSeedToEdit}
					/>
				)}
				{formOpen && (
					<RegisterSeed
						setFormOpen={setFormOpen}
						seedToEdit={seedToEdit}
						setSeedToEdit={setSeedToEdit}
					/>
				)}
			</main>
			<footer>2024 &copy; Simon Winter</footer>
		</>
	);
}

export default App;
