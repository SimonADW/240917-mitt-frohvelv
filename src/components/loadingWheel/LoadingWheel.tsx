import React from 'react'
import style from './LoadingWheel.module.css'

const LoadingWheel = () => {
  return (
	<div className={style.wheelBackdrop}>
		<div className={style.wheel}></div>
		<p>Loading...</p>
	</div>
  )
}

export default LoadingWheel