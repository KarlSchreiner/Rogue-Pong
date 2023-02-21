import React, { FC } from 'react';
import styles from './AITeamHud.module.scss';

interface AiTeamHudProps {}

const AiTeamHud: FC<AiTeamHudProps> = () => (
  <div className={styles.AiTeamHud} data-testid="AiTeamHud">
    AiTeamHud Component
  </div>
);

export default AiTeamHud;
