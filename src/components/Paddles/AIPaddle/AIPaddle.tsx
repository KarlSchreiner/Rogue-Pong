import React, { FC, useEffect } from 'react';
import Paddle from '../Paddle/Paddle';
import styles from './AIPaddle.module.scss';
import { stats } from '../../../interface/stats';


interface AIPaddleProps {
  count: number;
  delta: number;
  ballHeight: number;
  rightPaddleSetter : any;
  stats: stats;
}

const AIPaddle: FC<AIPaddleProps> = (AIPaddleProps) => {



  
  return(<div className={styles.AIPaddle} data-testid="AIPaddle">
   <Paddle stats={AIPaddleProps.stats}count={AIPaddleProps.count} delta={AIPaddleProps.delta} ballHeight={AIPaddleProps.ballHeight}  backgroundColor={"aquamarine"} paddleSetter={AIPaddleProps.rightPaddleSetter}></Paddle>
  </div>)
};

export default AIPaddle;
