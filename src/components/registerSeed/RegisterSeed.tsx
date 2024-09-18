import { CurrentStockType } from "../../App";
import style from "./RegisterSeed.module.css";
import closeIcon from "../../assets/close-square-svgrepo-com.svg";

type RegisterSeedProps = {
	currentStock: CurrentStockType,
	setCurrentStock: React.Dispatch<React.SetStateAction<CurrentStockType>>,
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
	isEditing: boolean;
};

const RegisterSeed = ({ setFormOpen, isEditing }: RegisterSeedProps) => {
	return (
		<section className={style.registerSeed__wrapper}>
				<button
					onClick={() => setFormOpen(false)}
					className={style.registerSeed__closeButton}
				>
					<img src={closeIcon} alt="close icon"/>
				</button>
			<form className={style.registerSeed__form} action="">
				<div>
					<label htmlFor="name">Navn:</label>
					<input type="text" id="name" name="name" />
				</div>
				<div>
					<label htmlFor="producer">Produsent:</label>
					<input type="text" id="producer" name="producer" />
				</div>
				<div>
					<label htmlFor="stock">Beholdning:</label>
					<select defaultValue="hel" name="stock" id="">
						<option value="rest">Rest</option>
						<option value="halv">Halv pakke</option>
						<option value="hel">Hel pakke</option>
					</select>
				</div>
				<div>
					<label htmlFor="comment">Kommentar:</label>
					<input type="text" name="comment" id="comment" />
				</div>
				<button type="submit">{isEditing ? 'Oppdater' : 'Legg til'}</button>
			</form>
		</section>
	);
};

export default RegisterSeed;
