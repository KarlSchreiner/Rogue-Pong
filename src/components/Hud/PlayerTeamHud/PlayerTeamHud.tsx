import React, { FC, useEffect, useState } from 'react';
import styles from './PlayerTeamHud.module.scss';
import { subscribe, unsubscribe } from '../../../util/events';
import { EventNames, WhoScoredPoint } from '../../../util/enums';

interface PlayerTeamHudProps {startingHealth : number}

const PlayerTeamHud: FC<PlayerTeamHudProps> = (PlayerTeamHudProps) => {
  const [health, setHealth] = useState(PlayerTeamHudProps.startingHealth);
  
  // if (ballRect.right >= window.innerWidth) {
    //     //playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    //     console.log("PLAYER SCORRRRRREEEDDDD WOOOOOOOOOOO!")
    // }
    // else {
    //     //computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    //     console.log("ai has been pointed oof criiiiiinge... :(")
    // }

    useEffect(() => {
      subscribe(EventNames.pointScored, (e: CustomEvent) => ProcessPointScored(e))
  
      return () => {
        unsubscribe(EventNames.pointScored, (e: CustomEvent) => ProcessPointScored(e));
      }
    }, []);

    function ProcessPointScored(e:CustomEvent)
    {
      if(e.detail.scorer == WhoScoredPoint.ai)
      {
        
        setHealth(prevHealth => prevHealth - 1);
        console.log("player lost health... new health:" + (health-1))
      }
      // console.log(typeof(e))
      console.log("e:  ", e.detail.scorer)
    }
  
  
  return(<div className={styles.PlayerTeamHud} data-testid="PlayerTeamHud">
    PlayerTeamHud Component {health}
  </div>)
};

export default PlayerTeamHud;
