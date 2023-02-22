import React, { FC, useEffect, useState } from 'react';
import styles from './PlayerTeamHud.module.scss';
import { sides } from '../../../util/enums';
import HealthDisplay from '../healthDisplay/healthDisplay';

interface PlayerTeamHudProps {currentHealth : number}

const PlayerTeamHud: FC<PlayerTeamHudProps> = (PlayerTeamHudProps) => {
  
  // if (ballRect.right >= window.innerWidth) {
    //     //playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    //     console.log("PLAYER SCORRRRRREEEDDDD WOOOOOOOOOOO!")
    // }
    // else {
    //     //computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    //     console.log("ai has been pointed oof criiiiiinge... :(")
    // }

  
  
  return(<div className={styles.PlayerTeamHud} data-testid="PlayerTeamHud">
    Player Health <HealthDisplay currentHealth={PlayerTeamHudProps.currentHealth}></HealthDisplay>
  </div>)
};

export default PlayerTeamHud;
