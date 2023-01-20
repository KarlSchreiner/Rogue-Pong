import React, { FC, useState } from 'react';
import Ball from '../Ball/Ball';
import styles from './ActiveGame.module.scss';

interface ActiveGameProps {}



const ActiveGame: FC<ActiveGameProps> = () => {

  const [callUpdate, setCallUpdate] =useState(0);
  // const handleIncrease = () => {
  //   setCount(count + 1);
  // };
  let throwAway = 0
  console.log(throwAway)
  React.useEffect(()=>{
    let ballElem = document.getElementById("Ball0")
    let frameId: number;

    let lastTime : number | undefined;
    const updateFunction =  (time: number)  => {
     const currentTime = time
      // console.log(lastTime, frameTime)
      if(lastTime){
        const delta = currentTime - lastTime
        // console.log(delta);
        //computerPaddle.update(delta, ball.y);
        setCallUpdate(delta);
        // ballElem.update(delta, [playerPaddle.rect(), computerPaddle.rect()])

        // if (isLose()) {

        //     handleLose()
        // }
      }

      lastTime = currentTime
      
      frameId = requestAnimationFrame(updateFunction)
      
     
    }
    requestAnimationFrame(updateFunction)
    return () => cancelAnimationFrame(frameId);
  }, []);
  return (
  <div className={styles.ActiveGame} data-testid="ActiveGame">
     <Ball id={0} callUpdate={callUpdate}></Ball>
    
  </div>)
};

export default ActiveGame;
