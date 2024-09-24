import { ChangeEvent, useContext } from 'react';
import { CurrentStockType } from '../../hooks/useSeed';
import styles from './AddAndSearch.module.css'
import { SeedsContext } from '../../context/SeedsContext';

type addAndSearchProps = {
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setListToDisplay: React.Dispatch<React.SetStateAction<CurrentStockType>>;
}


const AddAndSearch = ({setFormOpen, setListToDisplay}: addAndSearchProps) => {
	const { currentStock } = useContext(SeedsContext)

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>)=> {	
		const searchValue = event.target.value;
		if(searchValue === "") {
			setListToDisplay(currentStock);
		} else {
			setListToDisplay(currentStock.filter((
				seed)=> seed.name.toLowerCase().includes(searchValue.toLowerCase())
					|| 
					seed.manufacturer.toLowerCase().includes(searchValue.toLowerCase())))
		}
	}

  return (
	<div className={styles.addAndSearchContainer}>
		<button onClick={()=> setFormOpen(true)}>Nytt frø</button>
		<input onChange={handleSearchChange} type="search" placeholder="Søk etter frø"/>
	</div>
  )
}

export default AddAndSearch