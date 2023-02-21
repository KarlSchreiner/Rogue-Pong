import React, { FC } from 'react';
import styles from './healthDisplay.module.scss';

interface HealthDisplayProps {}

const HealthDisplay: FC<HealthDisplayProps> = () => (
  <div className={styles.HealthDisplay} data-testid="HealthDisplay">
    HealthDisplay Component
  </div>
);

export default HealthDisplay;


//todo send event when it hits 0 