import React, { FC } from 'react';
import styles from './Ball.module.scss';

interface BallProps {}

const Ball: FC<BallProps> = () => (
  <div className={styles.Ball} data-testid="Ball">
    Ball Component
  </div>
);

export default Ball;
