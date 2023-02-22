import React, { FC } from 'react';
import styles from './healthDisplay.module.scss';
import heart from './heart.jpg'

interface HealthDisplayProps {currentHealth : number}

const HealthDisplay: FC<HealthDisplayProps> = (HealthDisplayProps) => {

//todo handle when health is down to 0 
let hearts : Array<JSX.Element> = Array.apply(null, Array(HealthDisplayProps.currentHealth)).map((e, index) => <img key={index} src={heart} alt="health" width="30" height="30"></img> as JSX.Element)


  return (
  <div className={styles.HealthDisplay} data-testid="HealthDisplay">
{hearts}
  </div>
  )
};

export default HealthDisplay;


//todo send event when it hits 0 