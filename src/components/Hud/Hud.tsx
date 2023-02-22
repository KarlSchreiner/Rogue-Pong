import React, { FC } from 'react';
import AiTeamHud from './AITeamHud/AITeamHud';
import styles from './Hud.module.scss';
import PlayerTeamHud from './PlayerTeamHud/PlayerTeamHud';

interface HudProps {
  health : {aiHealth : number, playerHealth : number}
}

const Hud: FC<HudProps> = (HudProps) => (
  <div className={styles.Hud} data-testid="Hud">

    <PlayerTeamHud currentHealth={HudProps.health.playerHealth}></PlayerTeamHud>
    <AiTeamHud currentHealth={HudProps.health.aiHealth}></AiTeamHud>
  </div>
);

export default Hud;
