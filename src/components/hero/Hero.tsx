import logo from '../../assets/sprout_logo_transparent.png'
import styles from './Hero.module.css'

const Hero = () => {
  return (
	<div className={styles.hero} >
		<h1>Mitt Frøhvelv</h1>
		<img src={logo} alt="frø som spirer" />
	</div>
  )
}

export default Hero