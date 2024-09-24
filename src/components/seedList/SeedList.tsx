import style from "./SeedList.module.css";
import editIcon from "../../assets/edit-svgrepo-com.svg";
import deleteIcon from "../../assets/bag-svgrepo-com.svg";
import { CurrentStockType } from "../../hooks/useSeed.tsx";
import { useContext } from "react";
import { SeedsContext } from "../../context/SeedsContext.tsx";
import { itemType } from "../../hooks/useSeed.tsx";

type SeedListProps = {
	setListToDisplay: React.Dispatch<React.SetStateAction<CurrentStockType>>, 
	listToDisplay: CurrentStockType,
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setSeedToEdit: React.Dispatch<React.SetStateAction<itemType | null>>
};

const SeedList = ({ listToDisplay, setFormOpen, setSeedToEdit }: SeedListProps) => {
	const { deleteSeed } = useContext(SeedsContext)
	
	const openEditItem = (item: itemType) => {
		setSeedToEdit(item);
		setFormOpen(true);
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
						<li>{seed.manufacturer}</li>
						<li>{seed.stock}</li>
						<li className={style.seedList__buttonContainer}>
							<button onClick={()=> openEditItem(seed)}>
								<img src={editIcon} alt="pencil icon" />
							</button>						
							<button onClick={()=> deleteSeed(seed)}>
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
