import React, { FC, useEffect, useState } from 'react';
import Paddle from '../Paddle/Paddle';
import styles from './PlayerPaddle.module.scss';
import { stats } from '../../../interface/stats';

const SPEED = 0.02

interface PlayerPaddleProps {
  count: number;
  delta: number;
  ballHeight: number;
  leftPaddleSetter : any;
  stats: stats;
}

const PlayerPaddle: FC<PlayerPaddleProps> = (PlayerPaddleProps) => {


  return(<div className={styles.PlayerPaddle} data-testid="PlayerPaddle">
  <Paddle stats={PlayerPaddleProps.stats} backgroundColor={"chartreuse"}count={PlayerPaddleProps.count} delta={PlayerPaddleProps.delta} ballHeight={PlayerPaddleProps.ballHeight}  paddleSetter={PlayerPaddleProps.leftPaddleSetter}></Paddle>
  </div>)

}

export default PlayerPaddle;
