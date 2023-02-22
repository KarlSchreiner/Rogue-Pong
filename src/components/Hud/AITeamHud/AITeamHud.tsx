import React, { FC } from 'react';
import HealthDisplay from '../healthDisplay/healthDisplay';
import styles from './AITeamHud.module.scss';

interface AiTeamHudProps {currentHealth : number}

const AiTeamHud: FC<AiTeamHudProps> = (AiTeamHudProps) => (
  <div className={styles.AiTeamHud} data-testid="AiTeamHud">
        AI Health <HealthDisplay currentHealth={AiTeamHudProps.currentHealth}></HealthDisplay>
  </div>
);

export default AiTeamHud;
