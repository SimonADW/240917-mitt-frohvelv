import React from 'react'
import styles from './AddAndSearch.module.css'
import { setFormType } from '../../App'


const addAndSearch = ({setFormOpen}: setFormType) => {
  return (
	<div className={styles.addAndSearchContainer}>
		<button onClick={()=> setFormOpen(true)}>Nytt frø</button>
		<input type="search" placeholder="Søk etter frø"/>
	</div>
  )
}

export default addAndSearch