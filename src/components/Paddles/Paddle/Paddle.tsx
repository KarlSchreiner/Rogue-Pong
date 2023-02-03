import React, { FC, useEffect, Component } from 'react';
import styles from './Paddle.module.scss';

interface PaddleProps {
  position : number
}

const Paddle: FC<PaddleProps> = (PaddleProps) => {
  const [position, setPosition] = React.useState(50);

  useEffect(() =>{
    setPosition(PaddleProps.position);
    console.log("hello in paddle use effect")
  }, [PaddleProps.position])




  // useEffect(()=> {
  //   if(PaddleProps.aiUpdate){
  //   setPosition (position + SPEED * PaddleProps.aiUpdate.delta * (PaddleProps.aiUpdate.ballHeight - position))
  //   }
  // }, [PaddleProps.aiUpdate.count])





  return(
  <div className={styles.Paddle} data-testid="Paddle" style={{top: `${position}vh` }}>
  </div>)
};

export default Paddle;
