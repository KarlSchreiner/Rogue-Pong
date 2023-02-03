import React, { FC, useEffect, Component, useRef } from 'react';
import styles from './Paddle.module.scss';

interface PaddleProps {
  position : number
  paddleSetter : any
}

const Paddle: FC<PaddleProps> = (PaddleProps) => {
  const [position, setPosition] = React.useState(50);

  const paddleRef = useRef<HTMLInputElement>(null);

  useEffect(() =>{
    setPosition(PaddleProps.position);
    if(paddleRef.current)
    {
      
      PaddleProps.paddleSetter(paddleRef.current.getBoundingClientRect())
    }
  }, [PaddleProps.position])





  // useEffect(()=> {
  //   if(PaddleProps.aiUpdate){
  //   setPosition (position + SPEED * PaddleProps.aiUpdate.delta * (PaddleProps.aiUpdate.ballHeight - position))
  //   }
  // }, [PaddleProps.aiUpdate.count])





  return(
  <div ref={paddleRef} className={styles.Paddle} data-testid="Paddle" style={{top: `${position}vh` }}>
  </div>)
};

export default Paddle;
