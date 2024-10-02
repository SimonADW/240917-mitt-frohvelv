import style from "./RegisterSeed.module.css";
import closeIcon from "../../assets/close-square-svgrepo-com.svg";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SeedsContext } from "../../context/SeedsContext";
import { itemType } from "../../hooks/useSeed";

type RegisterSeedProps = {
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
	seedToEdit: itemType | null;
	setSeedToEdit: React.Dispatch<React.SetStateAction<itemType | null>>;
}

type Inputs = {
	firestoreID: string;
	name: string;
	manufacturer: string;
	stock: string;
	comment: string;
};

const RegisterSeed = ({ setFormOpen, seedToEdit, setSeedToEdit }: RegisterSeedProps) => {
	const { addSeed, editSeed } = useContext(SeedsContext)
	const {register, handleSubmit, formState: { errors }} = useForm<Inputs>({
		defaultValues: {
			name: seedToEdit ? seedToEdit.name : '',
			manufacturer: seedToEdit ? seedToEdit.manufacturer : '',
			stock: seedToEdit ? seedToEdit.stock : 'Hel',
			comment: seedToEdit ? seedToEdit.comment : ''
		}
	});

	const handleClose = () => {
		setFormOpen(false)
		setSeedToEdit(null)
	}

	const onSubmit = async (data: Inputs) => {
		if (seedToEdit) {
		  // If editing an existing seed
		  editSeed({
			...data,
			firestoreID: seedToEdit.firestoreID // Use existing Firestore document ID
		  });
		} else {
		  // If adding a new seed
		  addSeed(data); // Firestore will generate the ID here
		}
		setFormOpen(false);
		setSeedToEdit(null); // Reset after adding or editing
	  };


	return (
		<section className={style.registerSeed__wrapper}>
				<button
					onClick={handleClose}
					className={style.registerSeed__closeButton}
				>
					<img src={closeIcon} alt="close icon"/>
				</button>
			<form onSubmit={handleSubmit(onSubmit)} className={style.registerSeed__form} action="">
				<div>
					<label htmlFor="name">Navn:</label>
					<input type="text" id="name" autoFocus {...register("name", {required: "Navn er påkrevd", maxLength: 20})} />
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
						<option value="Flere">Flere pakker</option>
					</select>
				</div>
				<div>
					<label htmlFor="comment">Kommentar:</label>
					<input type="text" id="comment" {...register("comment")} />
				</div>
				<button type="submit">{seedToEdit ? 'Oppdater' : 'Legg til'}</button>
			</form>
		</section>
	);
};

export default RegisterSeed;
