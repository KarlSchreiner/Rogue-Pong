import React, { FC, useState } from 'react';
import Ball from '../Ball/Ball';
import AIPaddle from '../Paddles/AIPaddle/AIPaddle';
import PlayerPaddle from '../Paddles/PlayerPaddle/PlayerPaddle';
import Paddle from '../Paddles/Paddle/Paddle';
import styles from './ActiveGame.module.scss';
import PlayerTeamHud from '../Hud/PlayerTeamHud/PlayerTeamHud';
import { sides} from '../../util/enums';
import AiTeamHud from '../Hud/AITeamHud/AITeamHud';
import Hud from '../Hud/Hud';
import { stats } from '../../interface/stats';

interface ActiveGameProps {}



const ActiveGame: FC<ActiveGameProps> = () => {
  // console.log("re-rendered lmao")

  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(0);
  const [ballHeight, setBallHeight] = useState(0);

  //TODO: make interface taht is an object for all the data a ball has, and have an array of objects stored in here
  // const [ballsData, setBallsData] = useState([{}]);
  const [leftPaddleRect, setLeftPaddleRect]  = useState({bottom: 0, top: 0, left: 0, right: 0})
  const [rightPaddleRect, setRightPaddleRect]  = useState({bottom: 0, top: 0, left: 0, right: 0})
  //todo handle when health is down to 0 
  const [health, setHealth] = useState({playerHealth: 5, aiHealth: 5})



  const ballHeightSetter = (ballHeight : number) => {
    setBallHeight(ballHeight)
  }

  const leftPaddleSetter = (leftPaddleRect : DOMRect) => {
    setLeftPaddleRect(leftPaddleRect)
  }

  const rightPaddleSetter = (rightPaddleRect : DOMRect) => {
    setRightPaddleRect(rightPaddleRect)
  }

  const healthSetter = (numChanged :  number, who : sides) => {
    if (who === sides.ai){
      setHealth((prevValue) => ( {...prevValue, aiHealth : prevValue.aiHealth - numChanged}))
    }
    else{
      setHealth((prevValue) => ( {...prevValue, playerHealth : prevValue.playerHealth - numChanged}))
    }
  }


  // const handleIncrease = () => {
  //   setCount(count + 1);
  // };


  React.useEffect(()=>{
    let frameId: number;
    let lastTime : number | undefined;
    
    
    const updateFunction =  (time: number)  => {
      const currentTime = time
      
      if(lastTime){
        const delta = currentTime - lastTime
        setCount(prevCount => prevCount + 1);
        setDelta(delta);

        
      }

      lastTime = currentTime
      frameId = requestAnimationFrame(updateFunction)
      
     
    }
    requestAnimationFrame(updateFunction)
    return () => cancelAnimationFrame(frameId);
  }, []);


  

  

let playerStats : stats = {
  health: 5,
  overheatChance: 20,
  overheatLength: 1000,
  speed: 0.3,
};
let aiStats : stats = {
  health: 6,
  overheatChance: 30,
  overheatLength: 1000,
  speed: 0.3,
}

  

  return (
  <div className={styles.ActiveGame} data-testid="ActiveGame">

     <Ball id={0} count={count} delta={delta} ballHeightSetter={ballHeightSetter} leftPaddles={[leftPaddleRect]} rightPaddles={[rightPaddleRect]} healthSetter={healthSetter}></Ball>
     <AIPaddle stats={aiStats}count={count} delta={delta} ballHeight={ballHeight}  rightPaddleSetter={rightPaddleSetter}></AIPaddle>
     <PlayerPaddle stats={playerStats}count={count} delta={delta} ballHeight={ballHeight}  leftPaddleSetter={leftPaddleSetter}></PlayerPaddle>
     <Hud health={health}></Hud>
  </div>)
};

export default ActiveGame;
