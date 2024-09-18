import { setFormType } from "../../App";
import style from "./RegisterSeed.module.css";

const RegisterSeed = ({ setFormOpen }: setFormType) => {
	return (
		<section className={style.registerSeed__wrapper}>
			<button
				onClick={() => setFormOpen(false)}
				className={style.registerSeed__closeButton}
			>
				X
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
					<select name="stock" id="">
						<option value="litt">Litt</option>
						<option value="halv">Halv pakke</option>
						<option value="hel">Hel pakke</option>
					</select>
				</div>
				<div>
					<label htmlFor="comment">Kommentar:</label>
					<input type="text" name="comment" id="comment" />
				</div>
				<button type="submit">Legg til</button>
			</form>
		</section>
	);
};

export default RegisterSeed;
