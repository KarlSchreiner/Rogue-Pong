import React, { FC, useEffect } from 'react';
import Paddle from '../Paddle/Paddle';
import styles from './AIPaddle.module.scss';

const SPEED = 0.02

interface AIPaddleProps {
  count: number;
  delta: number;
  ballHeight: number;
  rightPaddleSetter : any;
}

const AIPaddle: FC<AIPaddleProps> = (AIPaddleProps) => {
  const [position, setPosition] = React.useState(50);

    useEffect(()=> {
      setPosition (position + SPEED * AIPaddleProps.delta * (AIPaddleProps.ballHeight - position))
    }, [AIPaddleProps.count])


  
  return(<div className={styles.AIPaddle} data-testid="AIPaddle">
   <Paddle position={position}  paddleSetter={AIPaddleProps.rightPaddleSetter}></Paddle>
  </div>)
};

export default AIPaddle;