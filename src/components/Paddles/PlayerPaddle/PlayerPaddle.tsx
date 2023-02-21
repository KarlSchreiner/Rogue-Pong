import React, { FC, useEffect, useState } from 'react';
import Paddle from '../Paddle/Paddle';
import styles from './PlayerPaddle.module.scss';

const SPEED = 0.02

interface PlayerPaddleProps {
  count: number;
  delta: number;
  ballHeight: number;
  leftPaddleSetter : any;
}

const PlayerPaddle: FC<PlayerPaddleProps> = (PlayerPaddleProps) => {

  const [yPosition, setyPosition] = useState(50);
  

  // useEffect(()=> {
  //   setyPosition (yPosition + SPEED * PlayerPaddleProps.delta * (PlayerPaddleProps.ballHeight - yPosition))
  // }, [PlayerPaddleProps.count])


  useEffect(() => {
    const handleMouseMove = (event : any) => {
      setyPosition((event.clientY/ window.innerHeight)*100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);
  

  return(
  <div className={styles.PlayerPaddle} data-testid="PlayerPaddle">
    <Paddle position={yPosition} paddleSetter={PlayerPaddleProps.leftPaddleSetter}></Paddle>
  </div>)

}

export default PlayerPaddle;
