import React, { FC } from 'react';
import styles from './PongPaddle.module.scss';

interface PongPaddleProps {}

const PongPaddle: FC<PongPaddleProps> = () => (
  <div className={styles.PongPaddle} data-testid="PongPaddle">
    PongPaddle Component
  </div>
);

export default PongPaddle;
