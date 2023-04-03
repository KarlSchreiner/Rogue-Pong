import React, { FC, useEffect } from 'react';
import Paddle from '../Paddle/Paddle';
import styles from './AIPaddle.module.scss';
import { stats } from '../../../interface/stats';


interface AIPaddleProps {
  count: number;
  paddleIndex: number;
  delta: number;
  ballHeight: number;
  rightPaddleSetter : any;
  stats: stats;
  backgroundColor : string
}

const AIPaddle: FC<AIPaddleProps> = (AIPaddleProps) => {



  
  return(<div className={styles.AIPaddle} data-testid="AIPaddle">
   <Paddle stats={AIPaddleProps.stats} count={AIPaddleProps.count} paddleIndex={AIPaddleProps.paddleIndex} delta={AIPaddleProps.delta} ballHeight={AIPaddleProps.ballHeight}  backgroundColor={AIPaddleProps.backgroundColor} paddleSetter={AIPaddleProps.rightPaddleSetter}></Paddle>
  </div>)
};

export default AIPaddle;
