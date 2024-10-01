import style from "./SeedList.module.css";
import editIcon from "../../assets/edit-svgrepo-com.svg";
import deleteIcon from "../../assets/bag-svgrepo-com.svg";
import { CurrentStockType } from "../../hooks/useSeed.tsx";
import { useContext, useState } from "react";
import { SeedsContext } from "../../context/SeedsContext.tsx";
import { itemType } from "../../hooks/useSeed.tsx";
import { FaAngleDown } from "react-icons/fa6";
import sproutLogo from "../../assets/sprout_logo_transparent.png";

type SeedListProps = {
	setListToDisplay: React.Dispatch<React.SetStateAction<CurrentStockType>>;
	listToDisplay: CurrentStockType;
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSeedToEdit: React.Dispatch<React.SetStateAction<itemType | null>>;
};

const SeedList = ({
	listToDisplay,
	setFormOpen,
	setSeedToEdit,
}: SeedListProps) => {
	const { deleteSeed } = useContext(SeedsContext);
	const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);

	const openEditItem = (item: itemType) => {
		setSeedToEdit(item);
		setFormOpen(true);
	};

	return listToDisplay.length > 0 ? (
		<ul>
			<li className={style.seedListLi__headings}>
				<div>Vekst</div>
				<div>Beholding</div>
				<div></div>
			</li>

			{listToDisplay.map((seed) => {
				return (
					<li key={seed.id} className={style.seedListLi}>
						<div className={style.seedListLi__accordionClosedContent}>
							<button
								onClick={() =>
									openAccordionId === seed.id
										? setOpenAccordionId(null)
										: setOpenAccordionId(seed.id)
								}
								className={`${style.accordionButton} ${
									openAccordionId === seed.id && style.active
								}`}
							>
								<FaAngleDown />
							</button>

							<div>{seed.name}</div>
							<div>{seed.stock}</div>
							<div className={style.seedList__buttonContainer}>
								<button onClick={() => openEditItem(seed)}>
									<img src={editIcon} alt="pencil icon" />
								</button>
								<button onClick={() => deleteSeed(seed)}>
									<img src={deleteIcon} alt="trashcan icon" />
								</button>
							</div>
						</div>
						{openAccordionId === seed.id && (
							<div
								className={
									style.seedListLi__accordionOpenContent
								}
							>
								<div>
									<span>Produsent: </span>
									<span>{seed.manufacturer}</span>
								</div>

								{seed.comment && (
									<div>
										<span>Kommentar:</span>
										<span>{seed.comment}</span>
									</div>
								)}
							</div>
						)}
					</li>
				);
			})}
		</ul>
	) : (
		<div className={style.noItemsContainer}>
			<svg width="400" height="200">
				{/* <!-- Define the curved path --> */}
				<path
					id="curve"
					d="M 50 150 Q 200 50 350 150"
					fill="transparent"
				/>

				{/* <!-- Use the path to create curved text --> */}
				<text>
					<textPath className={style.noItems} href="#curve">
						Nothing to see(d) here
					</textPath>
				</text>
			</svg>
			<img
				className={style.noItemsLogo}
				src={sproutLogo}
				alt="Sprout logo"
			/>
		</div>
	);
};

export default SeedList;
