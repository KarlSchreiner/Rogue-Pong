import React, { FC } from 'react';
import styles from './PongBall.module.scss';

interface PongBallProps {}

const PongBall: FC<PongBallProps> = () => (
  <div className={styles.PongBall} data-testid="PongBall">
    PongBall Component
  </div>
);

export default PongBall;
