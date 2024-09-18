import { useReducer, useState } from "react";
import style from "./SeedList.module.css";
import editIcon from "../../assets/edit-svgrepo-com.svg";
import deleteIcon from "../../assets/bag-svgrepo-com.svg";
import { CurrentStockType } from "../../App";

type SeedListProps = {
	currentStock: CurrentStockType,
	setCurrentStock: React.Dispatch<React.SetStateAction<CurrentStockType>>,
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
};

const SeedList = ({ currentStock, setCurrentStock, setFormOpen, setIsEditing }: SeedListProps) => {
	const [listToDisplay, setListToDisplay] = useState(currentStock)
	// const [state, dispatch] = useReducer(reducer, second)

	const handleEditItem = () => {
		setIsEditing(true);
		setFormOpen(true);
	};

	const handleDeleteItem = (clickedSeedID: number) => {
		const clonedStock = [...currentStock];
		const updatedStock = clonedStock.filter((seed) => seed.id !== clickedSeedID);
		setCurrentStock([...updatedStock]);
		setListToDisplay([...updatedStock]);
	};
	
	
	return (
		<div>
			<ul className={style.seedList}>
				<li>Vekst</li>
				<li>Produsent</li>
				<li>Beholding</li>
				<li></li>
			</ul>
			{listToDisplay.map((seed) => {
				return (
					<ul key={seed.id} className={style.seedList}>
						<li>{seed.name}</li>
						<li>{seed.producer}</li>
						<li>{seed.stock}</li>
						<li className={style.seedList__buttonContainer}>
							<button onClick={()=> handleEditItem()}>
								<img src={editIcon} alt="pencil icon" />
							</button>						
							<button onClick={()=> handleDeleteItem(seed.id)}>
								<img src={deleteIcon} alt="trashcan icon" />
							</button>
						</li>
					</ul>
				);
			})}
		</div>
	);
};

export default SeedList;
