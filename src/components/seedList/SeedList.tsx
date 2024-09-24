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
		<ul>
			<li className={style.seedListLi}>
				<div>Vekst</div>
				<div>Produsent</div>
				<div>Beholding</div>
				<div></div>
			</li>
			{listToDisplay.map((seed) => {
				return (
					<li key={seed.id} className={style.seedListLi}>
						<div>{seed.name}</div>
						<div>{seed.manufacturer}</div>
						<div>{seed.stock}</div>
						<div className={style.seedList__buttonContainer}>
							<button onClick={()=> openEditItem(seed)}>
								<img src={editIcon} alt="pencil icon" />
							</button>						
							<button onClick={()=> deleteSeed(seed)}>
								<img src={deleteIcon} alt="trashcan icon" />
							</button>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default SeedList;
