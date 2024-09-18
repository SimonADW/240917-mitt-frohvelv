import { useReducer, useState } from "react";
import style from "./SeedList.module.css";

type SeedListProps = {
	currentStock: {
		id: number;
		name: string;
		producer: string;
		stock: number;
	}[];
};

const SeedList = ({ currentStock }: SeedListProps) => {
	const [listToDisplay, setListToDisplay] = useState(currentStock)
	// const [state, dispatch] = useReducer(reducer, second)

	const handleStockChange = () => {
		console.log("Stock change");
	};

	const handleDeleteItem = () => {
		console.log("Delete item");
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
							<select onChange={() => handleStockChange()} name="stock" id="">						
								<option value="litt">Litt</option>
								<option value="halv">Halv pakke</option>
								<option value="hel">Hel pakke</option>
							</select>							
							<button onClick={()=> handleDeleteItem()}>🗑️</button>
						</li>
					</ul>
				);
			})}
		</div>
	);
};

export default SeedList;
