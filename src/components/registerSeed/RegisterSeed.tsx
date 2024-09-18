import { CurrentStockType } from "../../App";
import style from "./RegisterSeed.module.css";
import closeIcon from "../../assets/close-square-svgrepo-com.svg";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterSeedProps = {
	currentStock: CurrentStockType,
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
	isEditing: boolean;
	handleAddItem: (newItem: CurrentStockType[number]) => void;
};

type Inputs = {
	id: number;
	name: string;
	manufacturer: string;
	stock: string;
	comment: string;
};

const RegisterSeed = ({ setFormOpen, isEditing, handleAddItem }: RegisterSeedProps) => {
	const {register, handleSubmit, formState: { errors }} = useForm<Inputs>({
		// TODO: Set default values for the form
		defaultValues: {
			name: isEditing ? 'seed.name' : '',
			manufacturer: isEditing ? 'seed.producer' : '',
			stock: isEditing ? 'seed.stock' : 'hel',
			comment: isEditing ? 'seed.comment' : ''
		}
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		handleAddItem(data);
	};


	return (
		<section className={style.registerSeed__wrapper}>
				<button
					onClick={() => setFormOpen(false)}
					className={style.registerSeed__closeButton}
				>
					<img src={closeIcon} alt="close icon"/>
				</button>
			<form onSubmit={handleSubmit(onSubmit)} className={style.registerSeed__form} action="">
				<div>
					<label htmlFor="name">Navn:</label>
					<input type="text" id="name" {...register("name", {required: "Navn er påkrevd", maxLength: 20})} />
					<div className={style.formError}>{errors.name?.message}</div>
				</div>
				<div>
					<label htmlFor="manufacturer">Produsent:</label>
					<input type="text" id="manufacturer" {...register("manufacturer", {required: "Produsent er påkrevd", maxLength: 20})} />
					<div className={style.formError}>{errors.manufacturer?.message}</div>
				</div>
				<div>
					<label htmlFor="stock">Beholdning:</label>
					<select defaultValue="Hel" {...register("stock")}>
						<option value="Rest">Rest</option>
						<option value="Halv">Halv pakke</option>
						<option value="Hel">Hel pakke</option>
					</select>
				</div>
				<div>
					<label htmlFor="comment">Kommentar:</label>
					<input type="text" id="comment" {...register("comment")} />
				</div>
				<button type="submit">{isEditing ? 'Oppdater' : 'Legg til'}</button>
			</form>
		</section>
	);
};

export default RegisterSeed;
