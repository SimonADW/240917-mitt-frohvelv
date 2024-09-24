import styles from './AddAndSearch.module.css'


const addAndSearch = ({setFormOpen}) => {
  return (
	<div className={styles.addAndSearchContainer}>
		<button onClick={()=> setFormOpen(true)}>Nytt frø</button>
		<input type="search" placeholder="Søk etter frø"/>
	</div>
  )
}

export default addAndSearch