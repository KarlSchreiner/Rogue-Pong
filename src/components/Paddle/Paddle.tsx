import React, { FC, useEffect } from 'react';
import styles from './Paddle.module.scss';

interface PaddleProps {
  aiUpdate ?: {count:number, delta: number, ballHeight : number}
}

const SPEED = 0.02

const Paddle: FC<PaddleProps> = (PaddleProps) => {
  const [position, setPosition] = React.useState(50);


  if(PaddleProps.aiUpdate){
  useEffect(()=> {
    if(PaddleProps.aiUpdate){
    setPosition (position + SPEED * PaddleProps.aiUpdate.delta * (PaddleProps.aiUpdate.ballHeight - position))
    }
  }, [PaddleProps.aiUpdate.count])
}



  return(
  <div className={styles.Paddle} data-testid="Paddle">
    Paddle Component
  </div>)
};

export default Paddle;
